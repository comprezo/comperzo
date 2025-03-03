import { imgToBlob } from '@/utils/files';
import './styles/img-controller.css';

import { initTextareaAutoResize } from '@/utils/textarea-autoresize';

type Options = {
   $img: HTMLImageElement;
   initialUrl: string;
}

export default class ImgController {
   private $img: HTMLImageElement;
   private $url!: HTMLTextAreaElement;
   private $size!: HTMLElement;
   private $resolution!: HTMLElement;

   private initialUrl = '';

   constructor(private $root: HTMLElement, { $img, initialUrl }: Options) {
      this.$img = $img;
      this.initialUrl = initialUrl;

      this.init();
   }

   private init() {
      this.getElements();
      this.initEvents();
      this.initImg();
      initTextareaAutoResize(this.$url);
   }

   private initEvents() {
      this.$url.addEventListener('change', () => {
         this.updateImg();
      });

      this.$url.addEventListener('keydown', (e) => {
         if (e.key !== 'Enter') return;
         e.preventDefault();

         this.updateImg();
      });

      this.$img.addEventListener('load', () => {
         this.onLoad();
      });
   }

   private async onLoad() {
      this.$img.style.display = 'block'
      this.$img.width = this.$img.naturalWidth;
      this.$img.height = this.$img.naturalHeight;

      this.updateStats();
   }

   private async updateStats() {
      const w = this.$img.naturalWidth;
      const h = this.$img.naturalHeight;

      this.$resolution.textContent = `${w}x${h}`;

      const size = await imgToBlob(this.$img);
      this.$size.textContent = `${size} KB`;
   }

   private async updateImg() {
      this.$img.src = this.$url.value;
      this.$img.style.display = 'block';
   }

   private initImg() {
      this.$url.value = this.initialUrl;
      this.updateImg();
   }

   private getElements() {
      this.$url = this.$root.querySelector('.url-js') as HTMLTextAreaElement;
      this.$size = this.$root.querySelector('.size-js') as HTMLElement;
      this.$resolution = this.$root.querySelector('.resolution-js') as HTMLElement;
   }
}