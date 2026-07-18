import { useState, useEffect, useCallback, useRef } from 'react';
export function useRideTimer(isRunning: boolean) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    if (isRunning) {
      startRef.current = Date.now();
      const interval = setInterval(() => { if (startRef.current) setElapsed(Math.floor((Date.now() - startRef.current) / 1000)); }, 1000);
      return () => clearInterval(interval);
    } else { startRef.current = null; setElapsed(0); }
  }, [isRunning]);
  const format = useCallback((s: number): string => { const m = Math.floor(s / 60); const sec = s % 60; return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`; }, []);
  return { elapsed, formatted: format(elapsed) };
}
