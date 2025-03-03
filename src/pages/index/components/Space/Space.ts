import { handleDrag } from '@/utils/drag';
import './styles/app-space.css';

import { throttle } from 'throttle-debounce';

export default class Space {
   private ZOOM_STEP = 0.001;
   private MIN_ZOOM = 0.02;
   private MAX_ZOOM = 50;
   private DRAG_THRESHOLD = 10;

   private $root: HTMLElement;
   private $spaceWrapper!: HTMLElement;
   private $space!: HTMLElement;
   private $images!: HTMLImageElement[];
   private $handleV!: HTMLElement;
   private $handleH!: HTMLElement;
   private $handleXY!: HTMLElement;

   private zoom = 1;
   private x = 0;
   private y = 0;
   private handleX = 0;
   private handleY = 0;

   private transformFrameId = -1;

   constructor($root: HTMLElement) {
      this.$root = $root;
      this.init();
   }

   private init() {
      this.getElements();
      this.initEvents();
   }

   private initEvents() {
      this.$root.addEventListener('wheel', (e) => {
         e.preventDefault();
         this.zoomBy(e.deltaY);
      });

      this.initSpaceDrag();
      this.initHandlesDrag();
   }

   private initSpaceDrag() {
      let startX = 0;
      let startY = 0;

      handleDrag(this.$spaceWrapper, {
         threshold: this.DRAG_THRESHOLD,
         onBefore: () => {
            startX = this.x;
            startY = this.y;
         },
         onDrag: (dx, dy) => {
            this.setTranslate(startX + dx, startY + dy);
         },
      });
   }

   private initHandlesDrag() {
      let startX = 0;
      let startY = 0;

      handleDrag(this.$handleV, {
         threshold: this.DRAG_THRESHOLD,
         onBefore: () => startX = this.handleX,
         onDrag: (dx) => {
            this.setHandles(startX + dx, this.handleY);
         },
      });

      handleDrag(this.$handleH, {
         threshold: this.DRAG_THRESHOLD,
         onBefore: () => startY = this.handleY,
         onDrag: (_dx, dy) => {
            this.setHandles(this.handleX, startY + dy);
         },
      });

      handleDrag(this.$handleXY, {
         threshold: this.DRAG_THRESHOLD,
         onBefore: () => {
            startX = this.handleX;
            startY = this.handleY;
         },
         onDrag: (dx, dy) => {
            this.setHandles(startX + dx, startY + dy);
         },
      });
   }

   private setTranslate(dx: number, dy: number) {
      this.x = dx;
      this.y = dy;

      this.scheduleRender();
   }

   private zoomBy(delta: number) {
      this.zoom += delta * this.ZOOM_STEP * this.zoom;
      this.zoom = Math.max(this.MIN_ZOOM, Math.min(this.MAX_ZOOM, this.zoom));

      this.scheduleRender();
   }

   private setHandles(x: number, y: number) {
      this.handleX = x;
      this.handleY = y;

      this.scheduleRender();
   }

   private scheduleRender() {
      cancelAnimationFrame(this.transformFrameId);

      this.transformFrameId = requestAnimationFrame(() => {
         this.render();
      });
   }

   private render() {
      const x = this.x / this.zoom;
      const y = this.y / this.zoom;

      const splitX = this.handleX / this.zoom - x;
      const splitY = this.handleY / this.zoom - y;

      this.$space.style.transform = `scale(${this.zoom}) translate(${x}px, ${y}px)`;

      this.$root.style.setProperty('--split-x', `${splitX}px`);
      this.$root.style.setProperty('--split-y', `${splitY}px`);

      this.$root.style.setProperty('--handle-x', `${this.handleX}px`);
      this.$root.style.setProperty('--handle-y', `${this.handleY}px`);
   }

   private getElements() {
      this.$spaceWrapper = this.$root.querySelector('.space-wrapper-js') as HTMLElement;
      this.$space = this.$spaceWrapper.querySelector('.space-js') as HTMLElement;
      this.$images = [...this.$space.querySelectorAll('.img-js')] as HTMLImageElement[];
      this.$handleV = this.$root.querySelector('.handle-v-js') as HTMLElement;
      this.$handleH = this.$root.querySelector('.handle-h-js') as HTMLElement;
      this.$handleXY = this.$root.querySelector('.handle-xy-js') as HTMLElement;
   }
}