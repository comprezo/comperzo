
export async function imgToBlob(img: HTMLImageElement): Promise<Blob> {
   const canvas = document.createElement('canvas');
   canvas.width = img.naturalWidth;
   canvas.height = img.naturalHeight;

   const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
   ctx.drawImage(img, 0, 0);

   return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
         if (blob) {
            resolve(blob);
         } else {
            reject(new Error('Canvas conversion to Blob failed'));
         }
      });
   });
}

export async function imgToBlogOffscreen(img: HTMLImageElement): Promise<Blob> {
   const offscreen = new OffscreenCanvas(img.naturalWidth, img.naturalHeight);
   const ctx = offscreen.getContext("2d") as OffscreenCanvasRenderingContext2D;
   ctx.drawImage(img, 0, 0);
   return offscreen.convertToBlob();
}

export function formatBytes(bytes: number, decimals = 2) {
   if (bytes === 0) return '0 B';
   
   const k = 1000; // Browsers use base-10 addressing
   const sizes = ['B', 'KB', 'MB', 'GB'];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   
   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}