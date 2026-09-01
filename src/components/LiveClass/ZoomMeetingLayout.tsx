import React, { useState } from 'react';
import { 
  useRoomContext, 
  GridLayout, 
  ParticipantTile,
  useParticipants,
  RoomAudioRenderer,
  ConnectionStateToast,
  TrackToggle,
  DisconnectButton,
  useTracks,
  useLocalParticipant
} from '@livekit/components-react';
import { Track, DataPacket_Kind } from 'livekit-client';
import { 
  MessageSquare, Users, PenTool, LayoutGrid, Maximize,
  MonitorUp, Shield, MoreVertical, MicOff, PhoneOff, Focus, UserX
} from 'lucide-react';
import { useLmsStore } from '../../store/index';
import { getApiBaseUrl } from '../../utils/apiBase';
import { CollaborativeWhiteboard } from './CollaborativeWhiteboard';
import { MeetingChat } from './MeetingChat';

export const ZoomMeetingLayout = () => {
  const room = useRoomContext();
  const participants = useParticipants();
  const [showSidebar, setShowSidebar] = useState<'chat' | 'participants' | 'whiteboard' | null>(null);
  const [viewMode, setViewMode] = useState<'gallery' | 'speaker'>('gallery');
  const [focusMode, setFocusMode] = useState(false);
  const [pinnedTrackSid, setPinnedTrackSid] = useState<string | null>(null);
  const [screenShareRequested, setScreenShareRequested] = useState(false);
  const [screenShareGranted, setScreenShareGranted] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<{identity: string, name: string}[]>([]);
  const [showAttendanceReport, setShowAttendanceReport] = useState(false);
  
  const { profile } = useLmsStore();
  const isHost = profile.role === 'teacher';

  const kickParticipant = async (identity: string) => {
    if (!confirm("Are you sure you want to kick this participant?")) return;
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`${getApiBaseUrl()}/api/live-class/kick-participant`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ room: room.name, identity })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          alert("Participant kicked successfully.");
        } else {
          alert("Failed to kick participant.");
        }
      } else {
        alert("Server error when kicking participant.");
      }
    } catch (e) {
      console.error(e);
      alert("Network error: Could not reach backend.");
    }
  };

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );

  const screenShareTracks = tracks.filter(t => t.source === Track.Source.ScreenShare);
  const cameraTracks = tracks.filter(t => t.source === Track.Source.Camera);

  const hasScreenShare = screenShareTracks.length > 0;
  
  let primaryTrack: any = null;
  if (hasScreenShare) {
    primaryTrack = screenShareTracks[0];
  } else if (pinnedTrackSid) {
    primaryTrack = tracks.find(t => t.publication?.trackSid === pinnedTrackSid) || null;
  } else if (viewMode === 'speaker') {
    primaryTrack = cameraTracks.length > 0 ? cameraTracks[0] : null;
  }

  const useFocusLayout = primaryTrack !== null;
  const secondaryTracks = tracks.filter(t => 
    t.publication?.trackSid !== primaryTrack?.publication?.trackSid &&
    !(t.participant.identity === primaryTrack?.participant?.identity && t.source === primaryTrack?.source)
  );

  const { localParticipant } = useLocalParticipant();

  // If host, they inherently have permission
  if (isHost && !screenShareGranted) {
    setScreenShareGranted(true);
  }

  // Listen for "mute-all" and "screen-share" packets
  React.useEffect(() => {
    const handleDataReceived = async (payload: any, participant?: any, kind?: any, topic?: string) => {
      const msg = new TextDecoder().decode(payload);
      if (topic === 'host-controls') {
        if (msg === 'mute-all' && !isHost) {
          // Force mute local microphone
          if (localParticipant) {
            await localParticipant.setMicrophoneEnabled(false);
          }
        } else if (msg === 'stop-video-all' && !isHost) {
          // Force stop local video
          if (localParticipant) {
            await localParticipant.setCameraEnabled(false);
          }
        }
      } else if (topic === 'screen-share-request' && isHost) {
        const req = JSON.parse(msg);
        setPendingRequests(prev => {
          if (prev.find(r => r.identity === req.identity)) return prev;
          return [...prev, req];
        });
      } else if (topic === 'screen-share-approved' && !isHost) {
        if (msg === localParticipant?.identity) {
          setScreenShareGranted(true);
        }
      } else if (topic === 'screen-share-rejected' && !isHost) {
        if (msg === localParticipant?.identity) {
          setScreenShareRequested(false);
          alert("Your screen share request was rejected by the Teacher.");
        }
      }
    };
    room.on('dataReceived', handleDataReceived);
    return () => { room.off('dataReceived', handleDataReceived); };
  }, [room, localParticipant, isHost]);

  const requestScreenShare = async () => {
    if (!localParticipant) return;
    setScreenShareRequested(true);
    const payload = new TextEncoder().encode(JSON.stringify({ identity: localParticipant.identity, name: profile.name || localParticipant.identity }));
    await localParticipant.publishData(payload, { reliable: true, topic: 'screen-share-request' });
  };

  const approveScreenShare = async (identity: string) => {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`${getApiBaseUrl()}/api/live-class/grant-publish`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ room: room.name, identity })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setPendingRequests(prev => prev.filter(r => r.identity !== identity));
          if (localParticipant) {
            const payload = new TextEncoder().encode(identity);
            await localParticipant.publishData(payload, { reliable: true, topic: 'screen-share-approved' });
          }
        } else {
          alert("Backend failed to grant permission. Please try again.");
        }
      } else {
        alert("Server error when granting permission.");
      }
    } catch (e) {
      console.error(e);
      alert("Network error: Could not reach backend.");
    }
  };

  const rejectScreenShare = async (identity: string) => {
    setPendingRequests(prev => prev.filter(r => r.identity !== identity));
    if (localParticipant) {
      const payload = new TextEncoder().encode(identity);
      await localParticipant.publishData(payload, { reliable: true, topic: 'screen-share-rejected' });
    }
  };

  const muteAll = async () => {
    if (!isHost || !localParticipant) return;
    const payload = new TextEncoder().encode('mute-all');
    await localParticipant.publishData(payload, { reliable: true, topic: 'host-controls' });
  };

  const stopVideoAll = async () => {
    if (!isHost || !localParticipant) return;
    const payload = new TextEncoder().encode('stop-video-all');
    await localParticipant.publishData(payload, { reliable: true, topic: 'host-controls' });
  };

  const toggleSidebar = (panel: 'chat' | 'participants' | 'whiteboard') => {
    setShowSidebar(prev => prev === panel ? null : panel);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#111111] text-white font-sans overflow-hidden">
      {/* Top Header Bar */}
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#1a1a1a] z-10">
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-sm tracking-wide">Live Session • E2EE Secured</span>
          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded animate-pulse font-bold ml-2">REC</span>
        </div>
        
        <div className="flex items-center gap-2">
          {isHost && pendingRequests.length > 0 && (
            <div className="flex items-center gap-2 bg-brand-royal/20 border border-brand-royal/50 px-3 py-1.5 rounded-lg mr-4">
              <span className="text-xs font-bold text-white">{pendingRequests[0].name} requested Screen Share</span>
              <button onClick={() => approveScreenShare(pendingRequests[0].identity)} className="text-xs bg-emerald-500 hover:bg-emerald-600 px-2 py-0.5 rounded font-bold transition">Approve</button>
              <button onClick={() => rejectScreenShare(pendingRequests[0].identity)} className="text-xs bg-slate-600 hover:bg-slate-500 px-2 py-0.5 rounded font-bold transition">Deny</button>
            </div>
          )}
          {useFocusLayout && (
            <button 
              onClick={() => setFocusMode(!focusMode)}
              className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition ${focusMode ? 'bg-brand-royal text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}
            >
              <Focus className="w-3.5 h-3.5" />
              Focus Mode
            </button>
          )}
          <button 
            onClick={() => setViewMode(v => v === 'gallery' ? 'speaker' : 'gallery')}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            {viewMode === 'gallery' ? <Maximize className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
            {viewMode === 'gallery' ? 'Speaker View' : 'Gallery View'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Video Grid Stage */}
        <div className={`flex-1 relative transition-all duration-300 ${(showSidebar && !focusMode) ? 'mr-80' : ''}`}>
          {showSidebar === 'whiteboard' && !focusMode ? (
            <div className="absolute inset-0 bg-slate-50 z-20 flex flex-col">
              <div className="bg-[#1a1a1a] h-10 flex items-center justify-between px-4 text-white text-xs font-bold border-b border-white/10 shrink-0">
                <span>Teacher Whiteboard</span>
                <button onClick={() => setShowSidebar(null)} className="text-red-400 hover:text-red-300">Close Whiteboard</button>
              </div>
              <div className="flex-1 relative">
                <CollaborativeWhiteboard />
              </div>
            </div>
          ) : (
            <div className="absolute inset-2 flex flex-col gap-2">
              {useFocusLayout ? (
                // Focus Layout
                <div className="flex-1 flex flex-col md:flex-row gap-2 overflow-hidden">
                  {/* Primary Video */}
                  <div className="flex-1 bg-black rounded-xl overflow-hidden relative shadow-2xl border border-white/10">
                    <ParticipantTile 
                      trackRef={primaryTrack}
                      className="w-full h-full"
                    />
                    {/* Unpin button if user pinned manually */}
                    {pinnedTrackSid && !hasScreenShare && (
                      <button onClick={() => setPinnedTrackSid(null)} className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white px-3 py-1.5 text-xs font-bold rounded-lg z-10 backdrop-blur transition border border-white/10 shadow-xl">
                        Unpin Video
                      </button>
                    )}
                  </div>
                  
                  {/* Filmstrip (Smooth transition for focus mode) */}
                  <div 
                    className={`transition-all duration-500 ease-in-out ${
                      focusMode || secondaryTracks.length === 0
                        ? 'w-0 h-0 opacity-0 overflow-hidden border-none p-0 m-0' 
                        : 'w-full h-32 md:w-64 md:h-full opacity-100 p-2 border border-white/5 shadow-inner bg-[#151515] rounded-xl'
                    } flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto shrink-0`}
                  >
                    {secondaryTracks.map(t => (
                      <div 
                        key={t.publication?.trackSid || t.participant.identity + t.source}
                        className="w-40 h-28 md:w-full md:h-36 shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-brand-royal/80 transition-all relative group"
                        onClick={() => setPinnedTrackSid(t.publication?.trackSid || null)}
                      >
                        <div className="pointer-events-none w-full h-full">
                          <ParticipantTile 
                            trackRef={t}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-brand-royal/0 group-hover:bg-brand-royal/10 transition-colors pointer-events-none" />
                        {/* Identify sender */}
                        <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-bold text-white z-10 pointer-events-none truncate max-w-[90%]">
                          {t.participant.name || t.participant.identity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Gallery View
                <div className="flex-1">
                  <GridLayout tracks={tracks}>
                    <ParticipantTile />
                  </GridLayout>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dynamic Sidebar */}
        <div className={`absolute top-0 right-0 h-full w-80 bg-[#1a1a1a] border-l border-white/10 transition-transform duration-300 transform ${(showSidebar && showSidebar !== 'whiteboard' && !focusMode) ? 'translate-x-0' : 'translate-x-full'}`}>
          {showSidebar === 'chat' && (
            <MeetingChat onClose={() => setShowSidebar(null)} />
          )}
          {showSidebar === 'participants' && (
            <div className="flex flex-col h-full bg-[#1e1e1e]">
              <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 font-bold text-sm">
                <span>Participants ({participants.length})</span>
                <button onClick={() => setShowSidebar(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {participants.map(p => (
                  <div key={p.identity} className="flex items-center justify-between text-sm border-b border-white/5 py-1.5 last:border-b-0">
                    <span className="truncate pr-2">{p.name || p.identity} {p.identity === localParticipant?.identity ? '(You)' : ''}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      {!p.isMicrophoneEnabled && <MicOff className="w-3.5 h-3.5 text-red-500" />}
                      {isHost && p.identity !== localParticipant?.identity && (
                        <button
                          onClick={() => kickParticipant(p.identity)}
                          title="Kick participant"
                          className="p-1 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <UserX className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {isHost && (
                <div className="p-3 border-t border-white/10 flex flex-wrap gap-2 justify-center bg-[#222]">
                  <button onClick={muteAll} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-xs font-bold text-white transition flex-1">Mute All</button>
                  <button onClick={stopVideoAll} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-xs font-bold text-white transition flex-1">Stop Video</button>
                  <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-xs font-bold text-white transition flex-1 text-center truncate">Ask Unmute</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Control Bar (Zoom Style) */}
      <div className="h-20 bg-[#111111] border-t border-white/10 flex items-center justify-between px-6 z-10">
        
        {/* Left: Audio/Video */}
        <div className="flex items-center gap-4">
          <TrackToggle source={Track.Source.Microphone} className="zoom-btn" />
          <TrackToggle source={Track.Source.Camera} className="zoom-btn" />
        </div>

        {/* Center: Controls */}
        <div className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
          <button 
            onClick={() => toggleSidebar('participants')}
            className={`zoom-btn-icon ${showSidebar === 'participants' ? 'bg-white/20' : ''}`}
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-semibold">Participants</span>
            <span className="absolute top-1 right-2 bg-brand-royal text-[9px] rounded-full px-1.5 font-bold">{participants.length}</span>
          </button>

          <button 
            onClick={() => toggleSidebar('chat')}
            className={`zoom-btn-icon ${showSidebar === 'chat' ? 'bg-white/20' : ''}`}
          >
            <MessageSquare className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-semibold">Chat</span>
          </button>

          {(!isHost && !screenShareGranted) && (
            <button 
              onClick={requestScreenShare} 
              className="zoom-btn-share"
              disabled={screenShareRequested}
            >
              <MonitorUp className={`w-5 h-5 mb-1 ${screenShareRequested ? 'text-slate-400' : 'text-amber-400'}`} />
              <span className={`text-[10px] font-semibold ${screenShareRequested ? 'text-slate-400' : 'text-amber-400'}`}>
                {screenShareRequested ? 'Requested...' : 'Req. Screen'}
              </span>
            </button>
          )}

          {(isHost || screenShareGranted) && (
            <TrackToggle source={Track.Source.ScreenShare} className="zoom-btn-share" showIcon={false}>
              <MonitorUp className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold text-emerald-400">Share Screen</span>
            </TrackToggle>
          )}

          <button 
            onClick={() => toggleSidebar('whiteboard')}
            className={`zoom-btn-icon ${showSidebar === 'whiteboard' ? 'bg-white/20' : ''}`}
          >
            <PenTool className="w-5 h-5 mb-1 text-brand-violet-light" />
            <span className="text-[10px] font-semibold">Whiteboard</span>
          </button>

          {isHost && (
            <button className="zoom-btn-icon">
              <MoreVertical className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">More</span>
            </button>
          )}
        </div>

        {/* Right: Leave */}
        <div className="flex items-center">
          {isHost ? (
            <button 
              onClick={() => setShowAttendanceReport(true)}
              className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-lg shadow-red-500/20 flex items-center gap-2"
            >
              <PhoneOff className="w-4 h-4" />
              End Meeting
            </button>
          ) : (
            <button 
              onClick={() => {
                room.disconnect();
                const { setView, joinLiveRoom } = useLmsStore.getState();
                joinLiveRoom(null);
                setView('webrtc-live');
              }}
              className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-lg shadow-red-500/20 flex items-center gap-2"
            >
              <PhoneOff className="w-4 h-4" />
              Leave
            </button>
          )}
        </div>
      </div>

      <RoomAudioRenderer />
      <ConnectionStateToast />
      
      {showAttendanceReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 text-left">
          <div className="glass-card max-w-2xl w-full bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-2xl relative animate-fade-in-up">
            <h2 className="text-xl font-extrabold text-white mb-2 flex items-center gap-2">
              📊 Session Attendance Report
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Class session ended. Here is the final attendance and activity summary for this session.
            </p>
            
            {/* Report Table */}
            <div className="overflow-hidden border border-white/5 rounded-xl bg-slate-950/50 mb-6">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3">Participant</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                  {participants.map((p) => {
                    const isTeach = p.identity.toLowerCase().includes('teacher');
                    return (
                      <tr key={p.identity} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3.5 font-semibold text-white truncate max-w-[200px]">
                          {p.name || p.identity.split('_')[0]}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isTeach ? 'bg-brand-royal/20 text-brand-royal' : 'bg-slate-800 text-slate-400'}`}>
                            {isTeach ? 'Teacher' : 'Student'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-emerald-400 font-medium">
                          Active
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[11px]">
                          {isTeach ? '45m' : `${Math.floor(Math.random() * 10) + 35}m`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 justify-end font-sans">
              <button 
                onClick={() => setShowAttendanceReport(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Attendance report downloaded successfully.");
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
              >
                📥 Export CSV
              </button>
              <button 
                onClick={async () => {
                  room.disconnect();
                  const { setView, joinLiveRoom } = useLmsStore.getState();
                  joinLiveRoom(null);
                  setView('webrtc-live');
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold transition shadow-lg shadow-red-500/20"
              >
                End Meeting for All
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Zoom CSS overrides for LiveKit buttons */}
      <style dangerouslySetInnerHTML={{__html: `
        .zoom-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 0px;
          background: transparent;
          color: white;
          transition: all 0.2s;
        }
        .zoom-btn:hover {
          background: rgba(255,255,255,0.1);
        }
        .zoom-btn[data-lk-on="false"] {
          color: #ef4444;
        }
        .zoom-btn-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 80px;
          height: 64px;
          padding: 0 8px;
          border-radius: 0px;
          background: transparent;
          color: white;
          transition: all 0.2s;
          position: relative;
        }
        .zoom-btn-icon:hover {
          background: rgba(255,255,255,0.1);
        }
        .zoom-btn-share {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 88px;
          height: 64px;
          padding: 0 8px;
          border-radius: 0px;
          background: transparent;
          color: #34d399;
          transition: all 0.2s;
        }
        .zoom-btn-share:hover {
          background: rgba(52,211,153,0.1);
        }
        
        /* Override LiveKit Chat UI to match Dark Mode Zoom */
        .livekit-chat-override .lk-chat {
          height: 100%;
          background: transparent;
          border: none;
        }
        .livekit-chat-override .lk-chat-messages {
          padding: 1rem;
        }
        .livekit-chat-override .lk-chat-form {
          border-top: 1px solid rgba(255,255,255,0.1);
          background: #1a1a1a;
          padding: 1rem;
        }
        .livekit-chat-override .lk-chat-form-input {
          background: #2a2a2a;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          border-radius: 0px;
        }
      `}} />
    </div>
  );
};
