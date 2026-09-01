import React, { useRef, useEffect, useState } from 'react';
import { useRoomContext, useLocalParticipant } from '@livekit/components-react';
import { DataPacket_Kind } from 'livekit-client';

interface Point { x: number; y: number }
interface Stroke { points: Point[]; color: string; width: number }

export const CollaborativeWhiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3b82f6'); // brand-royal
  const [width, setWidth] = useState(2);
  const currentStrokeRef = useRef<Stroke>({ points: [], color, width });
  const allStrokesRef = useRef<Stroke[]>([]);

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
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  // Redraw all strokes
  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    allStrokesRef.current.forEach(stroke => drawStroke(ctx, stroke));
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
  }, []);

  // Listen for data packets from other participants
  useEffect(() => {
    const handleDataReceived = (payload: any, participant?: any, kind?: any, topic?: string) => {
      if (topic === 'whiteboard') {
        try {
          const stroke: Stroke = JSON.parse(new TextDecoder().decode(payload));
          allStrokesRef.current.push(stroke);
          redraw();
        } catch (e) {
          console.error("Failed to parse whiteboard data", e);
        }
      }
      if (topic === 'whiteboard-clear') {
        allStrokesRef.current = [];
        redraw();
      }
    };
    room.on('dataReceived', handleDataReceived);
    return () => { room.off('dataReceived', handleDataReceived); };
  }, [room]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getPos(e);
    currentStrokeRef.current = { points: [pos], color, width };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    currentStrokeRef.current.points.push(pos);
    
    // Quick redraw of just the current segment for performance
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const pts = currentStrokeRef.current.points;
    if (pts.length < 2) return;
    
    ctx.beginPath();
    ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = async () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Save to local state
    const stroke = { ...currentStrokeRef.current };
    allStrokesRef.current.push(stroke);
    
    // Broadcast stroke to room
    if (localParticipant) {
      const payload = new TextEncoder().encode(JSON.stringify(stroke));
      await localParticipant.publishData(payload, { reliable: true, topic: 'whiteboard' });
    }
  };

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
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

  const clearWhiteboard = async () => {
    allStrokesRef.current = [];
    redraw();
    if (localParticipant) {
      await localParticipant.publishData(new TextEncoder().encode('clear'), { reliable: true, topic: 'whiteboard-clear' });
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-50 overflow-hidden flex flex-col">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-xl z-10 border border-slate-200">
        <button onClick={() => setColor('#3b82f6')} className={`w-6 h-6 rounded-full bg-blue-500 ${color === '#3b82f6' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}></button>
        <button onClick={() => setColor('#ef4444')} className={`w-6 h-6 rounded-full bg-red-500 ${color === '#ef4444' ? 'ring-2 ring-offset-2 ring-red-500' : ''}`}></button>
        <button onClick={() => setColor('#10b981')} className={`w-6 h-6 rounded-full bg-emerald-500 ${color === '#10b981' ? 'ring-2 ring-offset-2 ring-emerald-500' : ''}`}></button>
        <button onClick={() => setColor('#111827')} className={`w-6 h-6 rounded-full bg-gray-900 ${color === '#111827' ? 'ring-2 ring-offset-2 ring-gray-900' : ''}`}></button>
        <div className="w-px h-6 bg-slate-200 mx-2"></div>
        <button onClick={() => setWidth(2)} className={`w-6 h-6 rounded-full flex items-center justify-center hover:bg-slate-100 ${width === 2 ? 'bg-slate-100' : ''}`}><div className="w-1 h-1 bg-slate-800 rounded-full"></div></button>
        <button onClick={() => setWidth(6)} className={`w-6 h-6 rounded-full flex items-center justify-center hover:bg-slate-100 ${width === 6 ? 'bg-slate-100' : ''}`}><div className="w-2.5 h-2.5 bg-slate-800 rounded-full"></div></button>
        <div className="w-px h-6 bg-slate-200 mx-2"></div>
        <button onClick={clearWhiteboard} className="text-xs font-bold text-red-500 hover:text-red-600">Clear</button>
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
