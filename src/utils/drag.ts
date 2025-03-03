
type DragOptions = {
   threshold?: number;
   onDrag: (dx: number, dy: number) => void;
   onBefore?: () => void;
   afterDrag?: () => void;
};

export function handleDrag($el: HTMLElement, {
   threshold = 10,
   onBefore = () => { },
   afterDrag = () => { },
   onDrag,
}: DragOptions) {
   $el.addEventListener('mousedown', (e) => {
      const dragAbort = new AbortController();
      onBefore();

      const startX = e.clientX;
      const startY = e.clientY;

      document.addEventListener('mousemove', (e) => {
         const dx = e.clientX - startX;
         const dy = e.clientY - startY;

         if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
            return;
         }

         onDrag(dx, dy);
      }, { signal: dragAbort.signal });

      document.addEventListener('mouseup', () => {
         dragAbort.abort();
         afterDrag();
      }, { once: true });
   });

   $el.addEventListener('touchstart', (e) => {
      e.preventDefault();

      const dragAbort = new AbortController();
      onBefore();

      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;

      document.addEventListener('touchmove', (e) => {
         if (e.defaultPrevented) {
            dragAbort.abort();
         }

         e.preventDefault();

         const touch = e.touches[0];
         const dx = touch.clientX - startX;
         const dy = touch.clientY - startY;

         if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
            return;
         }

         if (e.touches.length > 1) {
            dragAbort.abort();
            return;
         }

         onDrag(dx, dy);
      }, { signal: dragAbort.signal, passive: true });

      const abortHandler = (e: Event) => {
         dragAbort.abort();
         afterDrag();
      };

      document.addEventListener('touchend', abortHandler, { once: true, signal: dragAbort.signal });
      document.addEventListener('touchcancel', abortHandler, { once: true, signal: dragAbort.signal });
   });
}