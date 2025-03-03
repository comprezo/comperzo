import '@/pages/base-page/base-page.ts';
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

const initialImg = 'https://preview.giggster.com/images/locations-test/6ad58c04-f611-4e85-83aa-6f54070a5b0a/07e2ce12-7998-4541-8260-adbd45183b82/original.jpg?width=1280'
const initialImgs = [
   initialImg,
   `${initialImg}&format=jpg&saturation=100&quality=85`,
   `${initialImg}&format=webp&quality=65`,
   `${initialImg}&format=avif&quality=40`,
];

const $app = document.querySelector('.app-js') as HTMLElement;
const $space = $app.querySelector('.app-space-js') as HTMLElement;
const $imgControllers = [...$app.querySelectorAll('.img-controller-js')] as [HTMLTextAreaElement];

const space = new Space($space);
const imgControllers = $imgControllers.map(($c, i) => {
   new ImgController($c, {
      $img: space.getImage(i),
      initialUrl: initialImgs[i],
   });
});