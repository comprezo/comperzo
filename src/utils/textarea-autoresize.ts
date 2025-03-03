
export function initTextareaAutoResize($area: HTMLTextAreaElement) {
   resize($area);
   $area.addEventListener('input', () => resize($area));
}

function resize($el: HTMLElement) {
   $el.style.height = 'auto';
   $el.style.height = $el.scrollHeight + 'px';
}