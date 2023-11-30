import axios from "axios";
import type { HttpClient } from '@/types/http-client';

let instance: HttpClient | null = null;

export const getHttpClientInstance = () => {
  if (!instance) {
    instance = axios.create({
      baseURL: "https://randomuser.me/api",
    });
  }
  return instance;
};
