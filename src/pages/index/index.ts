import '@/pages/base-page/base-page.ts';

import './styles/img-controls.css';
import './styles/app.css';

import Space from './components/Space/Space';

/**
 * TODO:
 * - Quick handle move by clicking 1,2,3,4 - to show whole img 1,2,3,4; and 
 * for other numbers - other behavior - top 2, bottom 2, 0 - for initial etc
 * 
 * - When a handle is focuses - move with arrows 
 * (any side, no matter what handle is focused)
 * 
 * - When img params updated - save them to url
 */

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