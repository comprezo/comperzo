import { HttpError } from "@/components/errors/HttpError";

export type ApiError = {
   error: string;
}

type FetchApiOptions = {
   data?: any;
   requestInit?: RequestInit;
}

export async function fetchApi(path: string, method: string = 'GET', options: FetchApiOptions = {}) {
   try {
      const resp = await fetch(`${import.meta.env.VITE_API}${path}`, {
         ...options.requestInit,
         body: JSON.stringify(options.data),
         headers: {
            'Content-Type': 'application/json',
            ...options.requestInit?.headers,
         },
         method,
      });

      if (!resp.ok) {
         throw await HttpError.fromApiResponse(resp);
      }

      try {
         const result = await resp.json();
         return result;
      } catch (e) {
         // empty response
         return;
      }
   } catch (e) {
      throw e;
   }
}