import './styles/app-space.css';

import { throttle } from 'throttle-debounce';

export default class Space {
   private ZOOM_STEP = 0.001;
   private MIN_ZOOM = 0.02;
   private MAX_ZOOM = 50;

   private $root: HTMLElement;
   private $space!: HTMLElement;
   private $images!: HTMLImageElement[];
   private $handleV!: HTMLElement;
   private $handleH!: HTMLElement;

   private zoom = 1;
   private x = 0;
   private y = 0;

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
      this.$root.addEventListener('wheel', (e: WheelEvent) => {
         e.preventDefault();
         this.zoomBy(e.deltaY);
         console.log('wheel', e.deltaY);
      }, true);

      this.$space.addEventListener('mousedown', (e) => {
         this.dragStart();
      });
   }

   private dragStart() {
      console.log('dragStart');

      // document.addEventListener('mousemove', this.dragMove);
      // document.addEventListener('mouseup', this.dragEnd);
   }

   private zoomBy(delta: number) {
      this.zoom += delta * this.ZOOM_STEP * this.zoom;
      this.zoom = Math.max(this.MIN_ZOOM, Math.min(this.MAX_ZOOM, this.zoom));

      this.scheduleUpdateTransform();
   }

   private scheduleUpdateTransform() {
      cancelAnimationFrame(this.transformFrameId);

      this.transformFrameId = requestAnimationFrame(() => {
         this.updateTransform();
      });
   }

   private updateTransform() {
      this.$space.style.transform = `scale(${this.zoom})`;
   }

   private getElements() {
      this.$space = this.$root.querySelector('.space-js') as HTMLElement;
      this.$images = [...this.$space.querySelectorAll('.img-js')] as HTMLImageElement[];
      this.$handleV = this.$root.querySelector('.handle-v-js') as HTMLElement;
      this.$handleH = this.$root.querySelector('.handle-h-js') as HTMLElement;
   }
}