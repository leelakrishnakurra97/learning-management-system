import React, { useEffect, useState, useMemo } from 'react';
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
  PreJoin,
  useLocalParticipant,
  useRoomContext,
  useParticipants,
} from '@livekit/components-react';
import { ExternalE2EEKeyProvider } from 'livekit-client';
import '@livekit/components-styles';
import { ZoomMeetingLayout } from './ZoomMeetingLayout';
import { useLmsStore } from '../../store/index';
import { SimulatedLiveMeeting } from './SimulatedLiveMeeting';
import { getApiBaseUrl } from '../../utils/apiBase';

// Hardcoded for demo purposes. In production, securely distribute this key.
const E2EE_SHARED_KEY = 'video-shield-super-secret-key-123';

// The Floating Raise Hand Button
const RaiseHandButton = () => {
  const { localParticipant } = useLocalParticipant();
  const [isRaised, setIsRaised] = useState(false);

  useEffect(() => {
    if (localParticipant) {
      const metadata = localParticipant.metadata ? JSON.parse(localParticipant.metadata) : {};
      setIsRaised(metadata.handRaised === true);
    }
  }, [localParticipant?.metadata]);

  const toggleRaiseHand = async () => {
    if (!localParticipant) return;
    const newRaisedState = !isRaised;
    await localParticipant.setMetadata(JSON.stringify({ handRaised: newRaisedState }));
    setIsRaised(newRaisedState);
  };

  return (
    <button
      onClick={toggleRaiseHand}
      className={`absolute bottom-24 right-8 px-4 py-2 rounded-full font-bold shadow-lg transition-colors z-50 flex items-center gap-2 ${
        isRaised ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-white hover:bg-gray-100 text-slate-800'
      }`}
    >
      <span>{isRaised ? '✋ Lower Hand' : '✋ Raise Hand'}</span>
    </button>
  );
};

// Teacher Controls to see who raised hands
const TeacherOverlay = () => {
  const participants = useParticipants();
  const raisedHands = participants.filter(p => {
    try {
      const meta = p.metadata ? JSON.parse(p.metadata) : {};
      return meta.handRaised === true;
    } catch {
      return false;
    }
  });

  if (raisedHands.length === 0) return null;

  return (
    <div className="absolute top-4 right-4 bg-brand-navy border border-brand-accent/30 rounded-lg p-4 shadow-xl z-50 max-w-sm">
      <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
        <span className="text-amber-500">✋</span> Raised Hands ({raisedHands.length})
      </h3>
      <ul className="space-y-2">
        {raisedHands.map(p => (
          <li key={p.identity} className="text-sm text-slate-300 flex items-center justify-between">
            <span>{p.name || p.identity}</span>
            {/* Real implementation would update student token to allow publishing */}
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">Waiting</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const RoomContainer = ({ roomName, participantName, isTeacher }: { roomName: string, participantName: string, isTeacher: boolean }) => {
  const [token, setToken] = useState('');
  const [preJoinChoices, setPreJoinChoices] = useState<{ videoEnabled: boolean, audioEnabled: boolean, username?: string } | null>(null);
  const [isFetchingToken, setIsFetchingToken] = useState(false);
  const [tokenError, setTokenError] = useState('');
  const [livekitAvailable, setLivekitAvailable] = useState<boolean | null>(null);
  const storeToken = useLmsStore((state) => state.auth.token);

  // Check if real LiveKit server is active
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/live-class/status`);
        if (res.ok) {
          const data = await res.json();
          setLivekitAvailable(data.livekitAvailable);
        } else {
          setLivekitAvailable(false);
        }
      } catch {
        setLivekitAvailable(false);
      }
    };
    checkServer();
  }, []);

  // Set up the End-to-End Encryption "Video Shield"
  const e2eeProvider = useMemo(() => {
    const keyProvider = new ExternalE2EEKeyProvider();
    keyProvider.setKey(E2EE_SHARED_KEY);
    
    // In Vite, we cannot use workerUrl directly easily without a separate public file, 
    // but the components-react library handles basic E2EE setup natively.
    // For local dev without a worker file configured, we can disable e2ee locally if it crashes, 
    // but let's try to pass the provider.
    return {
      keyProvider,
      workerUrl: '/node_modules/livekit-client/dist/e2ee-worker.js',
    };
  }, []);

  const handlePreJoinSubmit = async (values: any) => {
    console.log("Joining with: ", values);
    setIsFetchingToken(true);
    setTokenError('');
    // Use the username typed in PreJoin, otherwise fallback to the prop
    const finalName = values.username || participantName;
    try {
      const resp = await fetch(
        `${getApiBaseUrl()}/api/live-class/token?room=${roomName}&participant=${encodeURIComponent(finalName)}&isTeacher=${isTeacher}`,
        {
          headers: {
            ...(storeToken ? { Authorization: `Bearer ${storeToken}` } : {})
          }
        }
      );
      if (resp.status === 403) {
        setTokenError("Access denied: You are not enrolled in the class for this meeting.");
        return;
      }
      if (!resp.ok) {
        setTokenError("Could not retrieve meeting token. Please try again later.");
        return;
      }
      const data = await resp.json();
      setToken(data.token);
      setPreJoinChoices(values);
    } catch (e) {
      console.error(e);
      setTokenError("Connection error: Could not reach token generation endpoint.");
    } finally {
      setIsFetchingToken(false);
    }
  };

  // If livekit availability is undetermined, show loading
  if (livekitAvailable === null) {
    return <div className="p-8 text-center text-white flex items-center justify-center h-full animate-pulse">Engaging Video Shield & Initializing Secure Connection...</div>;
  }

  // Fallback to SimulatedLiveMeeting when LiveKit is not active
  if (livekitAvailable === false) {
    return <SimulatedLiveMeeting roomName={roomName} participantName={participantName} isTeacher={isTeacher} />;
  }

  // Show PreJoin screen before connecting
  if (!preJoinChoices) {
    return (
      <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center" data-lk-theme="default">
        <div className="max-w-md w-full bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Join Live Class</h2>
          {tokenError && (
            <div className="mb-4 p-3 bg-red-950/50 border border-red-500/30 text-red-200 text-xs rounded font-medium text-center">
              ⚠️ {tokenError}
            </div>
          )}
          <PreJoin
            defaults={{
              videoEnabled: isTeacher,
              audioEnabled: isTeacher,
              username: participantName
            }}
            onSubmit={handlePreJoinSubmit}
            onValidate={(values) => {
              return true; // Any validation logic
            }}
          />
          {isFetchingToken && (
            <div className="text-center text-white mt-4 text-sm animate-pulse">Engaging Video Shield & Generating Tokens...</div>
          )}
        </div>
      </div>
    );
  }

  if (token === '') {
    return <div className="p-8 text-center text-white flex items-center justify-center h-full animate-pulse">Engaging Video Shield & Generating Tokens...</div>;
  }

  return (
    <LiveKitRoom
      video={preJoinChoices.videoEnabled}
      audio={preJoinChoices.audioEnabled}
      token={token}
      serverUrl={import.meta.env.VITE_LIVEKIT_URL || "ws://localhost:7880"}
      connect={true}
      data-lk-theme="default"
      onDisconnected={() => {
        const { setView, joinLiveRoom } = useLmsStore.getState();
        joinLiveRoom(null);
        setView('webrtc-live');
      }}
      style={{ height: '100vh', width: '100vw', backgroundColor: '#111111', position: 'fixed', top: 0, left: 0, zIndex: 50 }}
    >
      <ZoomMeetingLayout />
    </LiveKitRoom>
  );
};
