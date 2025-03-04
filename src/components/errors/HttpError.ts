import { ApiError } from "@/utils/api";
import { AppError } from "./AppError";

export class HttpError extends AppError {
   constructor(error: string, public response: Response) {
      super(error);
   }

   static async fromApiResponse(response: Response) {
      const error = await response.json() as ApiError;
      return new HttpError(error.error, response);
   }
}