
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
}