
export class AppError extends Error {
   constructor(public message: string, public cause?: Error, public meta?: any) {
      super(message);
   }
}
