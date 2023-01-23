import { useCallback, useRef } from "react";

export type DragCallbackState = {
  start: boolean;
  end: boolean;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  e: PointerEvent;
};

export function useMicroDrag<T extends SVGElement>(
  cb: (state: DragCallbackState) => void
) {
  const ref = useRef<T>(null);
  const isDraggingRef = useRef(false);
  const offsetRef = useRef([0, 0]);

  const onPointerDown = useCallback((e: PointerEvent) => {
    offsetRef.current = [e.clientX, e.clientY];
    isDraggingRef.current = true;
    ref.current?.setPointerCapture(e.pointerId);
    cb({
      start: true,
      end: false,
      dx: 0,
      dy: 0,
      e,
      startX: e.clientX,
      startY: e.clientY,
    });
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - offsetRef.current[0];
      const dy = e.clientY - offsetRef.current[1];
      cb({
        start: false,
        end: false,
        dx,
        dy,
        e,
        startX: offsetRef.current[0],
        startY: offsetRef.current[1],
      });
    }
  }, []);

  const onPointerUp = useCallback((e: PointerEvent) => {
    const dx = e.clientX - offsetRef.current[0];
    const dy = e.clientY - offsetRef.current[1];
    isDraggingRef.current = false;
    ref.current?.releasePointerCapture(e.pointerId);
    cb({
      start: false,
      end: true,
      dx,
      dy,
      e,
      startX: offsetRef.current[0],
      startY: offsetRef.current[1],
    });
  }, []);

  return { ref, onPointerDown, onPointerMove, onPointerUp };
}
