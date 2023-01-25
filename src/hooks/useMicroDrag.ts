import { useCallback, useRef } from "react";

export type DragCallbackState = {
  start: boolean;
  end: boolean;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  movX: number;
  movY: number;
  nativeEvent: PointerEvent;
};

export function useMicroDrag<T extends Element>(
  cb: (state: DragCallbackState) => void
) {
  const ref = useRef<T>(null);
  const isDraggingRef = useRef(false);
  const offsetRef = useRef([0, 0]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    offsetRef.current = [e.clientX, e.clientY];
    isDraggingRef.current = true;
    ref.current?.setPointerCapture(e.pointerId);
    cb({
      start: true,
      end: false,
      dx: 0,
      dy: 0,
      nativeEvent: e.nativeEvent,
      startX: e.clientX,
      startY: e.clientY,
      movX: e.movementX,
      movY: e.movementY,
    });
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - offsetRef.current[0];
      const dy = e.clientY - offsetRef.current[1];
      cb({
        start: false,
        end: false,
        dx,
        dy,
        nativeEvent: e.nativeEvent,
        startX: offsetRef.current[0],
        startY: offsetRef.current[1],
        movX: e.movementX,
        movY: e.movementY,
      });
    }
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const dx = e.clientX - offsetRef.current[0];
    const dy = e.clientY - offsetRef.current[1];
    isDraggingRef.current = false;
    ref.current?.releasePointerCapture(e.pointerId);
    cb({
      start: false,
      end: true,
      dx,
      dy,
      nativeEvent: e.nativeEvent,
      startX: offsetRef.current[0],
      startY: offsetRef.current[1],
      movX: e.movementX,
      movY: e.movementY,
    });
  }, []);

  return { ref, onPointerDown, onPointerMove, onPointerUp };
}
