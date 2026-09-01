import React, { useState, useRef, useEffect } from 'react';
import { useChat, useLocalParticipant, useParticipants } from '@livekit/components-react';
import { Send, MessageSquare, X } from 'lucide-react';

// Helper to extract 2 initials from name/identity
const getInitials = (name?: string) => {
  if (!name) return '?';
  const cleanName = name.replace(/\(teacher\)|\(student\)/gi, '').trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const MeetingChat = ({ onClose }: { onClose: () => void }) => {
  const { chatMessages, send, isSending } = useChat();
  const [message, setMessage] = useState('');
  const { localParticipant } = useLocalParticipant();
  const participants = useParticipants();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;
    try {
      await send(message.trim());
      setMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#121214] w-full text-white font-sans overflow-hidden border-l border-zinc-800/85">
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 0px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>

      {/* Header */}
      <div className="h-16 shrink-0 border-b border-zinc-800/80 flex items-center justify-between px-4 bg-[#161619]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-none flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-brand-royal" />
          </div>
          <div>
            <h3 className="font-bold text-xs tracking-wider text-slate-100 uppercase">Classroom Chat</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse-slow"></span>
              <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase">
                {participants.length} Active {participants.length === 1 ? 'user' : 'users'}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-zinc-800 border border-transparent hover:border-zinc-750 transition-all rounded-none text-zinc-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 select-none">
            <div className="border border-dashed border-zinc-800/80 p-5 bg-zinc-900/30 mb-4 rounded-none flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-zinc-650" />
            </div>
            <h4 className="text-xs font-bold tracking-widest text-slate-300 uppercase mb-1">No Messages Yet</h4>
            <p className="text-[11px] text-zinc-500 max-w-[200px] leading-relaxed">
              Start the discussion! Messages are visible to everyone in this room.
            </p>
          </div>
        ) : (
          chatMessages.map((msg, index) => {
            const isMe = msg.from?.identity === localParticipant?.identity;
            const isTeacher = msg.from?.identity?.toLowerCase().includes('teacher') || 
                              msg.from?.name?.toLowerCase().includes('teacher') || 
                              false;
            const senderName = isMe ? 'You' : (msg.from?.name || msg.from?.identity || 'User');
            
            // Format time (HH:MM)
            const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Get avatar initials
            const initials = getInitials(senderName === 'You' ? localParticipant?.name || localParticipant?.identity : senderName);
            const avatarBg = isTeacher ? 'bg-emerald-600 text-white' : (isMe ? 'bg-brand-royal text-white' : 'bg-zinc-700 text-slate-200');

            return (
              <div key={msg.id || index} className="group flex gap-3 items-start hover:bg-white/[0.01] p-1.5 transition-colors rounded-none">
                {/* Square Avatar */}
                <div className={`w-8 h-8 shrink-0 flex items-center justify-center text-xs font-bold uppercase tracking-wider rounded-none select-none border border-black/10 shadow-sm ${avatarBg}`}>
                  {initials}
                </div>

                {/* Message Box */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-bold text-slate-200 hover:text-slate-100 transition-colors">
                      {senderName}
                    </span>
                    
                    {/* Square Role Badge */}
                    {isTeacher ? (
                      <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded-none leading-none">
                        Teacher
                      </span>
                    ) : (
                      <span className="bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 px-1.5 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded-none leading-none">
                        Student
                      </span>
                    )}

                    <span className="text-[9px] text-zinc-500 font-medium ml-auto sm:ml-0">{time}</span>
                  </div>
                  
                  {/* Left-Bordered rectangular message block */}
                  <div 
                    className={`p-3 text-sm break-words whitespace-pre-wrap rounded-none border-t border-r border-b border-white/[0.02] text-slate-250 ${
                      isMe 
                        ? 'bg-brand-royal/10 border-l-[3px] border-brand-royal/70' 
                        : isTeacher
                          ? 'bg-emerald-950/15 border-l-[3px] border-emerald-500/60'
                          : 'bg-[#18181b]/65 border-l-[3px] border-zinc-600/80 border-zinc-800/80'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 p-4 bg-[#161619] border-t border-zinc-800/80">
        <form onSubmit={handleSend} className="relative flex flex-col gap-2">
          <div className="relative border border-zinc-800 bg-[#121214] focus-within:border-zinc-750 focus-within:ring-1 focus-within:ring-zinc-750 transition-all rounded-none">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full bg-transparent text-sm text-slate-200 placeholder-zinc-650 p-3 pb-12 resize-none focus:outline-none min-h-[52px] max-h-32 rounded-none scrollbar-thin"
              rows={1}
            />
            {/* Input Footer toolbar */}
            <div className="absolute right-2.5 bottom-2 flex items-center justify-between left-3 right-2.5 select-none pointer-events-none">
              <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-wider">
                Press Enter to Send
              </span>
              <button
                type="submit"
                disabled={!message.trim() || isSending}
                className="pointer-events-auto p-2 bg-brand-royal hover:bg-brand-royal/90 disabled:bg-zinc-800 disabled:text-zinc-600 text-white transition-all rounded-none flex items-center justify-center border border-brand-royal hover:border-brand-royal/80 disabled:border-zinc-800"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

