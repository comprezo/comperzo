import '@/pages/base-page/base-page.ts';

import './styles/app-panel.css';
import './styles/app.css';

import Space from './components/Space/Space';
import ImgController from './components/ImgController/ImgController';

/**
 * TODO:
 * - Quick handle move by clicking 1,2,3,4 - to show whole img 1,2,3,4; and 
 * for other numbers - other behavior - top 2, bottom 2, 0 - for initial etc
 * 
 * - When a handle is focuses - move with arrows 
 * (any side, no matter what handle is focused)
 * 
 * - When img params updated - save them to url
 * 
 * - On url update - copy url to empty (initial) inputs
 */

const initialImg = 'https://preview.giggster.com/images/media/hp4/hero/intro1@2500.jpg?width=2500'
const initialImgs = [
   `${initialImg}&quality=80`,
   `${initialImg}&format=jpg&saturation=100&quality=70`,
   `${initialImg}&format=webp&quality=65`,
   `${initialImg}&format=avif&quality=30`,
];

const $app = document.querySelector('.app-js') as HTMLElement;
const $space = $app.querySelector('.app-space-js') as HTMLElement;
const $imgControllers = [...$app.querySelectorAll('.img-controller-js')] as [HTMLTextAreaElement];
const $panel = $app.querySelector('.panel-js') as HTMLElement;

const space = new Space($space);
const imgControllers = $imgControllers.map(($c, i) => {
   new ImgController($c, {
      $img: space.getImage(i),
      initialUrl: initialImgs[i],
   });
});

initEvents();

function initEvents() {
   $panel.addEventListener('click', (e) => {
      const $target = e.target as HTMLElement;
      console.log(1);
      

      const $zoom = $target.closest('.zoom-js') as HTMLElement;
      console.log(2, $zoom);

      if ($zoom) {
         console.log(+$zoom.dataset.value! || 1);
         space.setZoom(+$zoom.dataset.value! || 1);
         space.setTranslate(0, 0);
      }
   });
}