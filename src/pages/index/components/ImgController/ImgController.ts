import { formatBytes } from '@/utils/files';
import './styles/img-controller.css';

import { initTextareaAutoResize } from '@/utils/textarea-autoresize';
import { fetchSize } from '@/api/size';

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
   private initialUrl = '';

   constructor(private $root: HTMLElement, { $img, initialUrl }: Options) {
      this.$img = $img;
      this.initialUrl = initialUrl;

      this.init();
   }

   private init() {
      this.getElements();
      this.initEvents();
      this.initUrl();
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
      this.$resolution.textContent = `${w}x${h} •`;
   }

   private async updateImg() {
      const url = this.$url.value;
      if (url === this.url) return;
      this.url = url;

      this.setLoading(true);
      this.updateImgSize();

      this.$img.src = url;
      await this.$img.decode();

      this.$img.width = this.$img.naturalWidth;
      this.$img.height = this.$img.naturalHeight;

      this.updateStats();
      this.setLoading(false);
   }

   private async updateImgSize() {
      const { size } = await fetchSize(this.$url.value);
      this.$size.textContent = `${formatBytes(size)}`;
   }

   private initUrl() {
      this.$url.value = this.initialUrl;
      this.updateImg();

      setTimeout(() => {
         initTextareaAutoResize(this.$url);
      }, 100);
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