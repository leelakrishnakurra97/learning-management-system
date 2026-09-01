import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  MessageSquare, Users, PenTool, LayoutGrid, Maximize,
  MonitorUp, Shield, MicOff, PhoneOff, Focus, UserX, Send, X, Mic, Video as VideoIcon, VideoOff, Check
} from "lucide-react";
import { useLmsStore } from "../../store/index";
import { getApiBaseUrl } from "../../utils/apiBase";

interface MockParticipant {
  identity: string;
  name: string;
  isTeacher: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
  handRaised: boolean;
  screenShareState: "none" | "requested" | "sharing";
  lastSeen: number;
}

interface MockChatMessage {
  id: string;
  fromIdentity: string;
  fromName: string;
  message: string;
  timestamp: number;
}

interface Point { x: number; y: number }
interface Stroke { points: Point[]; color: string; width: number }

export const SimulatedLiveMeeting = ({ 
  roomName, 
  participantName, 
  isTeacher 
}: { 
  roomName: string; 
  participantName: string; 
  isTeacher: boolean; 
}) => {
  const { setView, profile, joinLiveRoom } = useLmsStore();
  const identity = useMemo(() => {
    return isTeacher 
      ? `${participantName}_Teacher_${Date.now()}` 
      : `${participantName}_Student_${Date.now()}`;
  }, [participantName, isTeacher]);

  // Meeting states
  const [videoEnabled, setVideoEnabled] = useState(isTeacher);
  const [audioEnabled, setAudioEnabled] = useState(isTeacher);
  const [handRaised, setHandRaised] = useState(false);
  const [screenShareState, setScreenShareState] = useState<"none" | "requested" | "sharing">("none");

  // Sync states
  const [participants, setParticipants] = useState<MockParticipant[]>([]);
  const [chatMessages, setChatMessages] = useState<MockChatMessage[]>([]);
  const [whiteboardDataJson, setWhiteboardDataJson] = useState<string>("[]");
  const [showSidebar, setShowSidebar] = useState<"chat" | "participants" | "whiteboard" | null>(null);
  const [viewMode, setViewMode] = useState<"gallery" | "speaker">("gallery");

  // Chat sending queue
  const [pendingChatMessage, setPendingChatMessage] = useState<string>("");
  const [chatInput, setChatInput] = useState<string>("");

  // Whiteboard drawing variables
  const [wbColor, setWbColor] = useState("#3b82f6");
  const [wbWidth, setWbWidth] = useState(2);
  const whiteboardLocalUpdatedRef = useRef(false);
  const whiteboardStrokesRef = useRef<Stroke[]>([]);

  // Webcam stream
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // Grab local webcam stream when videoEnabled is true
  useEffect(() => {
    if (videoEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          setMediaStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn("Could not access local webcam:", err);
        });
    } else {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        setMediaStream(null);
      }
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    }
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoEnabled]);

  // Initial join request
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const initJoin = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/live-class/mock/join`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            roomName,
            participantName,
            identity,
            isTeacher,
            videoEnabled,
            audioEnabled,
            subjectTitle: (window as any)._activeTeacherSubject || "General Lecture",
            className: (window as any)._activeTeacherClass || "Class 11"
          })
        });
        if (res.status === 403) {
          alert("Access denied: You are not enrolled in the class for this meeting.");
          joinLiveRoom(null);
          setView("student-dash");
          return;
        }
      } catch (err) {
        console.error("Mock join failed:", err);
      }
    };
    initJoin();

    // Setup synchronization polling every 1.5 seconds
    const interval = setInterval(() => {
      syncRoom();
    }, 1500);

    return () => {
      clearInterval(interval);
      // Explicit leave
      fetch(`${getApiBaseUrl()}/api/live-class/mock/leave`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ roomName, identity })
      }).catch(console.error);
    };
  }, []);

  // Sync callback
  const syncRoom = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const syncBody: any = {
        roomName,
        identity,
        videoEnabled,
        audioEnabled,
        handRaised,
        screenShareState
      };

      // Send local chat message if queued
      if (pendingChatMessage) {
        syncBody.newChatMessage = pendingChatMessage;
        setPendingChatMessage(""); // clear queue immediately
      }

      // Send whiteboard data if we modified it locally
      if (whiteboardLocalUpdatedRef.current) {
        syncBody.whiteboardData = JSON.stringify(whiteboardStrokesRef.current);
        whiteboardLocalUpdatedRef.current = false;
      }

      const res = await fetch(`${getApiBaseUrl()}/api/live-class/mock/sync`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(syncBody)
      });

      if (res.status === 403) {
        alert("Access denied: You are not enrolled in the class for this meeting.");
        joinLiveRoom(null);
        setView("student-dash");
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setParticipants(data.participants || []);
        setChatMessages(data.chatMessages || []);

        // Apply host controls if they forced mute/video off
        const meOnServer = (data.participants || []).find((p: any) => p.identity === identity);
        if (meOnServer) {
          if (data.muteAllActive && !isTeacher && audioEnabled) {
            setAudioEnabled(false);
          }
          if (data.stopVideoAllActive && !isTeacher && videoEnabled) {
            setVideoEnabled(false);
          }
          if (meOnServer.screenShareState !== screenShareState) {
            setScreenShareState(meOnServer.screenShareState);
          }
        }

        // Merge remote whiteboard strokes if they changed
        if (data.whiteboardData && data.whiteboardData !== whiteboardDataJson) {
          setWhiteboardDataJson(data.whiteboardData);
          try {
            const parsed = JSON.parse(data.whiteboardData);
            whiteboardStrokesRef.current = parsed;
            // trigger canvas redraw
            window.dispatchEvent(new CustomEvent("wb-sync-redraw"));
          } catch (e) {
            console.error("Failed to parse synced whiteboard data:", e);
          }
        }
      }
    } catch (err) {
      console.warn("Failed syncing with local meet server:", err);
    }
  };

  // Host operations
  const sendHostCommand = async (command: string, targetIdentity?: string) => {
    const token = localStorage.getItem("auth_token");
    try {
      await fetch(`${getApiBaseUrl()}/api/live-class/mock/host-command`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ roomName, command, targetIdentity })
      });
      syncRoom();
    } catch (err) {
      console.error("Host command failed:", err);
    }
  };

  const disconnectCall = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    joinLiveRoom(null);
    setView("webrtc-live");
  };

  // Chat submit helper
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setPendingChatMessage(chatInput.trim());
    setChatInput("");
  };

  // Hand raise toggle
  const toggleRaiseHand = () => {
    setHandRaised(!handRaised);
  };

  // Screen share toggle
  const toggleScreenShare = () => {
    if (isTeacher) {
      setScreenShareState(screenShareState === "sharing" ? "none" : "sharing");
    } else {
      if (screenShareState === "none") {
        setScreenShareState("requested");
      } else {
        setScreenShareState("none");
      }
    }
  };

  // Identify raised hands for Host Overlay notification
  const studentsWithRaisedHands = participants.filter(p => !p.isTeacher && p.handRaised);
  // Identify screen share requests
  const screenShareRequests = participants.filter(p => !p.isTeacher && p.screenShareState === "requested");

  return (
    <div className="flex flex-col h-screen w-full bg-[#111111] text-white font-sans overflow-hidden">
      {/* CSS rules for dark custom scrollbars */}
      <style>{`
        .scrollbar-dark::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-dark::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-dark::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 0px;
        }
        .scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>

      {/* Top Header Bar */}
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#1a1a1a] z-10 select-none">
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-xs tracking-wide uppercase">Live Session • Local Secure Node</span>
          <span className="text-[9px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-none animate-pulse font-bold ml-2">REC</span>
        </div>
        
        <div className="flex items-center gap-2">
          {isTeacher && screenShareRequests.length > 0 && (
            <div className="flex items-center gap-2 bg-brand-royal/20 border border-brand-royal/40 px-3 py-1 rounded-none mr-4 animate-bounce">
              <span className="text-[10px] font-bold text-white uppercase">{screenShareRequests[0].name} requests Screen Share</span>
              <button 
                onClick={() => sendHostCommand("approve-screenshare", screenShareRequests[0].identity)} 
                className="text-[9px] bg-emerald-500 hover:bg-emerald-600 px-2 py-0.5 rounded-none font-bold uppercase transition"
              >
                Approve
              </button>
              <button 
                onClick={() => sendHostCommand("deny-screenshare", screenShareRequests[0].identity)} 
                className="text-[9px] bg-zinc-600 hover:bg-zinc-500 px-2 py-0.5 rounded-none font-bold uppercase transition"
              >
                Deny
              </button>
            </div>
          )}
          <button 
            onClick={() => setViewMode(v => v === "gallery" ? "speaker" : "gallery")}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            {viewMode === "gallery" ? <Maximize className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
            {viewMode === "gallery" ? "Speaker View" : "Gallery View"}
          </button>
        </div>
      </div>

      {/* Main Content Workspace Grid */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Video Grid stage */}
        <div className={`flex-1 relative transition-all duration-300 ${showSidebar ? "mr-80" : ""}`}>
          
          {showSidebar === "whiteboard" ? (
            <div className="absolute inset-0 bg-slate-50 z-20 flex flex-col">
              <div className="bg-[#1a1a1a] h-10 flex items-center justify-between px-4 text-white text-xs font-bold border-b border-white/10 shrink-0">
                <span>COLLABORATIVE WHITEBOARD</span>
                <button onClick={() => setShowSidebar(null)} className="text-red-400 hover:text-red-300 font-bold uppercase text-[10px] tracking-wider">Close Board</button>
              </div>
              <div className="flex-1 relative">
                <SimulatedWhiteboard 
                  color={wbColor} 
                  setColor={setWbColor} 
                  width={wbWidth} 
                  setWidth={setWbWidth} 
                  strokesRef={whiteboardStrokesRef}
                  localUpdatedRef={whiteboardLocalUpdatedRef}
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-2 flex flex-col gap-2 overflow-hidden">
              {/* Meeting participants grid */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 p-2 overflow-y-auto">
                
                {/* Local Participant Tile */}
                <div className="bg-[#151518] border border-white/5 relative flex items-center justify-center min-h-[200px] rounded-none overflow-hidden group">
                  {videoEnabled ? (
                    <video 
                      ref={localVideoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-brand-royal text-white font-extrabold flex items-center justify-center text-xl rounded-none shadow-md border border-white/10 uppercase select-none">
                      {participantName.substring(0, 2)}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 text-[10px] font-bold text-white z-10 border border-white/5 uppercase tracking-wide">
                    {participantName} (You) {isTeacher ? "• Teacher" : ""}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    {!audioEnabled && (
                      <span className="p-1 bg-red-500/80 text-white text-[9px] rounded-none border border-red-400/20 font-bold"><MicOff className="w-3 h-3" /></span>
                    )}
                    {handRaised && (
                      <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-none">✋ Hand Raised</span>
                    )}
                  </div>
                </div>

                {/* Remote Participants */}
                {participants.filter(p => p.identity !== identity).map((p) => (
                  <div key={p.identity} className="bg-[#151518] border border-white/5 relative flex items-center justify-center min-h-[200px] rounded-none overflow-hidden group">
                    {p.videoEnabled ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
                        {/* High quality CSS simulated animation of active camera feed */}
                        <div className="w-24 h-24 rounded-full bg-emerald-500/5 flex items-center justify-center border border-emerald-500/20 animate-pulse">
                          <VideoIcon className="w-8 h-8 text-emerald-400/70" />
                        </div>
                        <span className="text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-widest animate-pulse">Streaming HD Camera</span>
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-zinc-800 text-slate-300 font-extrabold flex items-center justify-center text-xl rounded-none border border-white/5 uppercase">
                        {p.name.substring(0, 2)}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 text-[10px] font-bold text-white z-10 border border-white/5 uppercase tracking-wide">
                      {p.name} {p.isTeacher ? "• Teacher" : ""}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      {!p.audioEnabled && (
                        <span className="p-1 bg-red-500/80 text-white text-[9px] rounded-none border border-red-400/20 font-bold"><MicOff className="w-3 h-3" /></span>
                      )}
                      {p.handRaised && (
                        <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-none">✋ Hand Raised</span>
                      )}
                      {isTeacher && (
                        <button 
                          onClick={() => sendHostCommand("kick", p.identity)} 
                          className="opacity-0 group-hover:opacity-100 p-1 bg-rose-600 hover:bg-rose-700 text-white text-[9px] font-bold uppercase rounded-none transition border border-rose-500/20"
                          title="Kick participant"
                        >
                          <UserX className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* If alone in meeting, show waiting placeholder */}
                {participants.length <= 1 && (
                  <div className="bg-[#151518] border border-white/5 border-dashed relative flex flex-col items-center justify-center min-h-[200px] rounded-none p-6 text-center select-none">
                    <div className="w-12 h-12 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3 font-bold">
                      ?
                    </div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-405">Waiting for Others</h5>
                    <p className="text-[10px] text-zinc-500 mt-1 max-w-[200px] leading-relaxed">
                      Share the room code <strong>{roomName}</strong> with students to begin class.
                    </p>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Teacher Active Hands-Raised Popup Alert */}
          {isTeacher && studentsWithRaisedHands.length > 0 && (
            <div className="absolute top-4 right-4 bg-slate-900 border border-amber-500/40 p-4 rounded-none shadow-2xl z-50 max-w-sm text-left">
              <h4 className="text-white text-xs font-extrabold flex items-center gap-1.5 uppercase tracking-wider border-b border-white/10 pb-2 mb-2">
                <span className="text-amber-500 text-base">✋</span> Raised Hands ({studentsWithRaisedHands.length})
              </h4>
              <ul className="space-y-1.5 max-h-40 overflow-y-auto scrollbar-dark pr-1">
                {studentsWithRaisedHands.map(student => (
                  <li key={student.identity} className="text-[11px] text-zinc-300 flex items-center justify-between">
                    <span className="font-semibold">{student.name}</span>
                    <span className="text-[9px] bg-zinc-800 text-zinc-400 border border-zinc-700 font-bold uppercase px-1.5 py-0.5">Awaiting Answer</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Chat / Participants view */}
        {showSidebar === "chat" && (
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#121214] border-l border-zinc-800 flex flex-col z-30">
            {/* Header */}
            <div className="h-16 shrink-0 border-b border-zinc-800 flex items-center justify-between px-4 bg-[#161619]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-none flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-brand-royal" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-xs tracking-wider text-slate-100 uppercase">Classroom Chat</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse"></span>
                    <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase">
                      {participants.length} Active {participants.length === 1 ? "user" : "users"}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowSidebar(null)}
                className="p-1 hover:bg-zinc-800 border border-transparent hover:border-zinc-750 transition text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message lists */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-dark">
              {chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 select-none">
                  <div className="border border-dashed border-zinc-800 p-4 bg-zinc-900/30 mb-3 rounded-none flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-zinc-700" />
                  </div>
                  <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">No Messages Yet</h4>
                  <p className="text-[10px] text-zinc-500 max-w-[150px] leading-relaxed">
                    Discussion is active. Send a message to start!
                  </p>
                </div>
              ) : (
                chatMessages.map((msg, index) => {
                  const isMe = msg.fromIdentity === identity;
                  const isMsgTeacher = msg.fromIdentity.toLowerCase().includes("teacher");
                  const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                  return (
                    <div key={msg.id || index} className="group flex gap-2.5 items-start text-left">
                      <div className={`w-7 h-7 shrink-0 flex items-center justify-center text-[10px] font-extrabold uppercase rounded-none border border-black/10 select-none ${
                        isMsgTeacher ? "bg-emerald-600 text-white" : (isMe ? "bg-brand-royal text-white" : "bg-zinc-700 text-slate-200")
                      }`}>
                        {msg.fromName.substring(0, 2)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[11px] font-bold text-slate-350 truncate">{msg.fromName}</span>
                          <span className="text-[9px] text-zinc-550">{time}</span>
                        </div>
                        <div className={`p-2.5 text-[12px] break-words whitespace-pre-wrap rounded-none border border-white/[0.02] ${
                          isMe ? "bg-brand-royal/10 border-l-2 border-brand-royal" : isMsgTeacher ? "bg-emerald-950/15 border-l-2 border-emerald-500" : "bg-[#18181b]/65 border-l-2 border-zinc-700"
                        }`}>
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Chat Send input Form */}
            <form onSubmit={handleSendChat} className="p-3 bg-[#161619] border-t border-zinc-800">
              <div className="relative border border-zinc-800 bg-[#121214] rounded-none focus-within:border-zinc-700">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendChat(e);
                    }
                  }}
                  placeholder="Send class note..."
                  className="w-full bg-transparent text-xs text-slate-200 placeholder-zinc-700 p-2.5 pb-10 resize-none focus:outline-none min-h-[45px] max-h-24 scrollbar-dark"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="absolute right-2 bottom-2 p-1.5 bg-brand-royal hover:bg-brand-royal/90 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-none flex items-center justify-center border border-brand-royal/60 disabled:border-transparent transition-all"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        )}

        {showSidebar === "participants" && (
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#121214] border-l border-zinc-800 flex flex-col z-30 select-none">
            <div className="h-16 shrink-0 border-b border-zinc-800 flex items-center justify-between px-4 bg-[#161619]">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-brand-royal" />
                <h3 className="font-bold text-xs tracking-wider text-slate-100 uppercase text-left">Active Roster ({participants.length})</h3>
              </div>
              <button onClick={() => setShowSidebar(null)} className="p-1 text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-dark text-left">
              {participants.map(p => (
                <div key={p.identity} className="flex items-center justify-between p-2 hover:bg-white/[0.02] border border-white/[0.01]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded-none border border-black/10 ${p.isTeacher ? "bg-emerald-600" : "bg-zinc-700"}`}>
                      {p.name.substring(0,2).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-zinc-200 truncate">{p.name} {p.identity === identity ? "(You)" : ""}</span>
                  </div>
                  
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider ${p.isTeacher ? "bg-emerald-950/45 text-emerald-400 border border-emerald-500/20" : "bg-zinc-800 text-zinc-400 border border-zinc-700/40"} border`}>
                    {p.isTeacher ? "Teacher" : "Student"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Panel Toolbar */}
      <div className="h-20 shrink-0 border-t border-white/10 bg-[#1a1a1a] flex items-center justify-between px-6 z-10 select-none">
        
        {/* Left Side: Mic / Camera */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-3 rounded-none border flex items-center justify-center transition ${
              audioEnabled 
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" 
                : "bg-red-600 hover:bg-red-700 border-red-500 text-white"
            }`}
            title={audioEnabled ? "Mute Microphone" : "Unmute Microphone"}
          >
            {audioEnabled ? <Mic className="w-4.5 h-4.5" /> : <MicOff className="w-4.5 h-4.5" />}
          </button>
          
          <button 
            onClick={() => setVideoEnabled(!videoEnabled)}
            className={`p-3 rounded-none border flex items-center justify-center transition ${
              videoEnabled 
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" 
                : "bg-red-600 hover:bg-red-700 border-red-500 text-white"
            }`}
            title={videoEnabled ? "Stop Video Camera" : "Start Video Camera"}
          >
            {videoEnabled ? <VideoIcon className="w-4.5 h-4.5" /> : <VideoOff className="w-4.5 h-4.5" />}
          </button>
        </div>

        {/* Center: Whiteboard, Screen Share, Host actions */}
        <div className="flex items-center gap-3">
          
          <button 
            onClick={toggleScreenShare}
            className={`flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 border transition ${
              screenShareState === "sharing" 
                ? "bg-emerald-600 hover:bg-emerald-700 border-emerald-500 text-white" 
                : screenShareState === "requested"
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-400 animate-pulse"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
            }`}
          >
            <MonitorUp className="w-4 h-4" />
            <span>
              {screenShareState === "sharing" 
                ? "Stop Share" 
                : screenShareState === "requested" 
                  ? "Requested..." 
                  : "Share Screen"}
            </span>
          </button>

          {!isTeacher && (
            <button 
              onClick={toggleRaiseHand}
              className={`flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 border transition ${
                handRaised 
                  ? "bg-amber-500 hover:bg-amber-600 border-amber-400 text-white" 
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
              }`}
            >
              <span className="text-sm leading-none">✋</span>
              <span>{handRaised ? "Lower Hand" : "Raise Hand"}</span>
            </button>
          )}

          {isTeacher && (
            <>
              <button 
                onClick={() => sendHostCommand("mute-all")}
                className="flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 bg-red-950/20 border border-red-500/30 text-red-400 hover:bg-red-950/45 hover:border-red-500/50 transition"
              >
                <MicOff className="w-4 h-4" />
                <span>Mute All</span>
              </button>
              
              <button 
                onClick={() => sendHostCommand("stop-video-all")}
                className="flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 bg-red-950/20 border border-red-500/30 text-red-400 hover:bg-red-950/45 hover:border-red-500/50 transition"
              >
                <VideoOff className="w-4 h-4" />
                <span>Stop Video All</span>
              </button>
            </>
          )}
        </div>

        {/* Right Side: Sidebar toggles & Disconnect */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSidebar(prev => prev === "whiteboard" ? null : "whiteboard")}
            className={`p-3 rounded-none border flex items-center justify-center transition ${
              showSidebar === "whiteboard" ? "bg-brand-royal border-brand-royal text-white" : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
            }`}
            title="Whiteboard"
          >
            <PenTool className="w-4.5 h-4.5" />
          </button>
          
          <button 
            onClick={() => setShowSidebar(prev => prev === "chat" ? null : "chat")}
            className={`p-3 rounded-none border flex items-center justify-center transition relative ${
              showSidebar === "chat" ? "bg-brand-royal border-brand-royal text-white" : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
            }`}
            title="Classroom Chat"
          >
            <MessageSquare className="w-4.5 h-4.5" />
          </button>

          <button 
            onClick={() => setShowSidebar(prev => prev === "participants" ? null : "participants")}
            className={`p-3 rounded-none border flex items-center justify-center transition ${
              showSidebar === "participants" ? "bg-brand-royal border-brand-royal text-white" : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
            }`}
            title="Participants List"
          >
            <Users className="w-4.5 h-4.5" />
          </button>

          <div className="w-px h-8 bg-white/10 mx-1"></div>

          <button 
            onClick={disconnectCall}
            className="flex items-center gap-2 px-4 py-2.5 rounded-none bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition border border-red-500/20 active:scale-95"
          >
            <PhoneOff className="w-4 h-4" />
            <span>Leave</span>
          </button>
        </div>

      </div>
    </div>
  );
};

// ==========================================
// SIMULATED WHITEBOARD COMPONENT
// ==========================================

const SimulatedWhiteboard = ({ 
  color, 
  setColor, 
  width, 
  setWidth, 
  strokesRef, 
  localUpdatedRef 
}: { 
  color: string;
  setColor: (c: string) => void;
  width: number;
  setWidth: (w: number) => void;
  strokesRef: React.MutableRefObject<Stroke[]>;
  localUpdatedRef: React.MutableRefObject<boolean>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const currentStrokeRef = useRef<Stroke>({ points: [], color, width });

  // Draw a single stroke
  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  // Redraw all strokes
  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokesRef.current.forEach(stroke => drawStroke(ctx, stroke));
  };

  // Resize canvas to fill container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
    redraw();

    const handleSyncRedraw = () => {
      redraw();
    };
    window.addEventListener("wb-sync-redraw", handleSyncRedraw);
    return () => window.removeEventListener("wb-sync-redraw", handleSyncRedraw);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getPos(e);
    currentStrokeRef.current = { points: [pos], color, width };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    currentStrokeRef.current.points.push(pos);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const pts = currentStrokeRef.current.points;
    if (pts.length < 2) return;
    
    ctx.beginPath();
    ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const stroke = { ...currentStrokeRef.current };
    strokesRef.current.push(stroke);
    
    // Mark as locally updated to trigger polling sync send
    localUpdatedRef.current = true;
  };

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top
    };
  };

  const clearWhiteboard = () => {
    strokesRef.current = [];
    redraw();
    localUpdatedRef.current = true;
  };

  return (
    <div className="relative w-full h-full bg-slate-50 overflow-hidden flex flex-col">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-4 py-2 rounded-none shadow-xl z-10 border border-slate-200">
        <button onClick={() => setColor("#3b82f6")} className={`w-5 h-5 rounded-none bg-blue-500 ${color === "#3b82f6" ? "ring-2 ring-offset-1 ring-blue-500" : ""}`}></button>
        <button onClick={() => setColor("#ef4444")} className={`w-5 h-5 rounded-none bg-red-500 ${color === "#ef4444" ? "ring-2 ring-offset-1 ring-red-500" : ""}`}></button>
        <button onClick={() => setColor("#10b981")} className={`w-5 h-5 rounded-none bg-emerald-500 ${color === "#10b981" ? "ring-2 ring-offset-1 ring-emerald-500" : ""}`}></button>
        <button onClick={() => setColor("#111827")} className={`w-5 h-5 rounded-none bg-gray-900 ${color === "#111827" ? "ring-2 ring-offset-1 ring-gray-900" : ""}`}></button>
        <div className="w-px h-5 bg-slate-200 mx-1.5"></div>
        <button onClick={() => setWidth(2)} className={`w-5 h-5 rounded-none flex items-center justify-center hover:bg-slate-100 ${width === 2 ? "bg-slate-100" : ""}`}><div className="w-1 h-1 bg-slate-800 rounded-full"></div></button>
        <button onClick={() => setWidth(6)} className={`w-5 h-5 rounded-none flex items-center justify-center hover:bg-slate-100 ${width === 6 ? "bg-slate-100" : ""}`}><div className="w-2 h-2 bg-slate-800 rounded-full"></div></button>
        <div className="w-px h-5 bg-slate-200 mx-1.5"></div>
        <button onClick={clearWhiteboard} className="text-[10px] font-bold uppercase text-red-500 hover:text-red-600">Clear</button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full cursor-crosshair touch-none"
      />
    </div>
  );
};
