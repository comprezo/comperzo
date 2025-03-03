import '@/pages/base-page/base-page.ts';

import './styles/img-controls.css';
import './styles/app.css';

import Space from './components/Space/Space';

const $app = document.querySelector('.app-js') as HTMLElement;
const $space = $app.querySelector('.app-space-js') as HTMLElement;
const $urls = [...$app.querySelectorAll('.url-js')] as [HTMLTextAreaElement];

const space = new Space($space);

$urls.forEach(($url) => initAutoResize($url));

function initAutoResize($area: HTMLTextAreaElement) {
   autoResize($area);

   $area.addEventListener('input', () => {
      autoResize($area);
   });
}

function autoResize($el: HTMLElement) {
   $el.style.height = 'auto';
   $el.style.height = $el.scrollHeight + 'px';
}