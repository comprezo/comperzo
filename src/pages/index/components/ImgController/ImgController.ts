import { formatBytes, imgToBlob } from '@/utils/files';
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

   private url = '';

   private resp!: Response;
   private blob!: Blob;

   constructor(private $root: HTMLElement, { $img, initialUrl }: Options) {
      this.$img = $img;
      this.url = initialUrl;

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
   }

   private async updateStats() {
      const w = this.$img.naturalWidth;
      const h = this.$img.naturalHeight;

      this.$resolution.textContent = `${w}x${h}`;

      const size = formatBytes(this.blob.size);
      this.$size.textContent = `• ${size}`;
   }

   private async updateImg() {
      const url = this.prepareUrl(this.$url.value);
      if (url === this.url && this.blob) return;      
      this.url = url;

      this.setLoading(true);

      this.resp = await fetch(url);
      this.blob = await this.resp.blob();

      const objectURL = URL.createObjectURL(this.blob);
      this.$img.src = objectURL

      await this.$img.decode();
      this.$img.width = this.$img.naturalWidth;
      this.$img.height = this.$img.naturalHeight;

      this.updateStats();
      this.setLoading(false);
   }

   private initImg() {
      this.$url.value = this.url;
      this.updateImg();
   }

   private prepareUrl(url: string) {
      const u = encodeURIComponent(url);
      return `https://comperzo.io/cors-proxy?url=${u}`;
   }

   private setLoading(val: boolean) {
      this.$root.classList.toggle('img-controller__loading', val);
      this.$img.classList.toggle('app-space--img__loading', val);
   }

   private getElements() {
      this.$url = this.$root.querySelector('.url-js') as HTMLTextAreaElement;
      this.$size = this.$root.querySelector('.size-js') as HTMLElement;
      this.$resolution = this.$root.querySelector('.resolution-js') as HTMLElement;
   }
}