import userAxiosInstance from '@/api/userAxiosInstance';
import { URL_API_ROUTES } from './routes/routes';

// Response interfaces
interface ShortenResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    shortUrl: string;
    longUrl: string;
    shortCode: string;
    customUrl: string | null;
    createdAt: string;
    totalClicks: number;
  };
}

interface UrlsResponse {
  success: boolean;
  data: Array<{
    id: string;
    shortUrl: string;
    longUrl: string;
    shortCode: string;
    customUrl: string | null;
    createdAt: string;
    totalClicks: number;
    lastClicked: string | null;
  }>;
}

interface Response {
  success: boolean;
  message: string;
}

// API calls

export const shortenUrl = async (
  longUrl: string,
  customUrl?: string
): Promise<ShortenResponse> => {
  const response = await userAxiosInstance.post<ShortenResponse>(
    URL_API_ROUTES.SHORTEN_URL,
    {
      longUrl,
      ...(customUrl && { customUrl }),
    }
  );
  return response.data;
};

export const getUserUrls = async (): Promise<UrlsResponse> => {
  const response = await userAxiosInstance.get<UrlsResponse>(
    URL_API_ROUTES.GET_URLS
  );
  return response.data;
};

export const deleteUrl = async (urlId: string): Promise<Response> => {
  const response = await userAxiosInstance.delete<Response>(
    URL_API_ROUTES.DELETE_URL(urlId)
  );
  return response.data;
};

export const logoutUser = async (): Promise<Response> => {
  const response = await userAxiosInstance.post(URL_API_ROUTES.LOGOUT);
  return response.data;
};

