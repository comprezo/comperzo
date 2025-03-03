type Options = {
   onZoom: (delta: number) => void;
};

// TODO: refactor after ChatGPT
export function handleZoom($el: HTMLElement, { onZoom }: Options) {
   // Mouse wheel zoom
   $el.addEventListener('wheel', (e) => {
      e.preventDefault();
      onZoom(e.deltaY);
   });

   // Variables to track pinch gesture
   let initialDistance: number | null = null;

   // Touch: start tracking pinch gesture
   $el.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.touches.length === 2) {
         initialDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
         );
      }
   });

   // Touch: update zoom based on pinch
   $el.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && initialDistance !== null) {
         // Calculate the current distance between the two touches
         const currentDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
         );
         // Delta represents the change in distance
         const delta = currentDistance - initialDistance;
         e.preventDefault();
         e.stopPropagation();
         onZoom(delta * 5);
         // Update the initial distance for continuous pinch zoom
         initialDistance = currentDistance;
      }
   }, { passive: false });

   // Reset when pinch gesture ends or is interrupted
   const resetPinch = () => { initialDistance = null; };
   $el.addEventListener('touchend', resetPinch);
   $el.addEventListener('touchcancel', resetPinch);
}
