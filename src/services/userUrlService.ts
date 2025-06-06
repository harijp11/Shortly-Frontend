import userAxiosInstance from '@/api/userAxiosInstance';

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

// interface AnalyticsResponse {
//   success: boolean;
//   data: {
//     url: {
//       shortUrl: string;
//       longUrl: string;
//       createdAt: string;
//     };
//     analytics: {
//       totalClicks: number;
//       clicksByDate: Record<string, number>;
//       browsers: Record<string, number>;
//       countries: Record<string, number>;
//       referrers: Record<string, number>;
//     };
//   };
// }

interface DeleteResponse {
  success: boolean;
  message: string;
}

// API calls

// Create/Shorten URL
export const shortenUrl = async (
  longUrl: string, 
  customUrl?: string
): Promise<ShortenResponse> => {
  const response = await userAxiosInstance.post<ShortenResponse>("/shorten", {
    longUrl,
    ...(customUrl && { customUrl }),
  });
  return response.data;
};

// Get all user URLs
export const getUserUrls = async (): Promise<UrlsResponse> => {
  const response = await userAxiosInstance.get<UrlsResponse>("/urls");
  return response.data;
};

// // Get analytics for a specific URL
// export const getUrlAnalytics = async (urlId: string): Promise<AnalyticsResponse> => {
//   const response = await userAxiosInstance.get<AnalyticsResponse>(`/analytics/${urlId}`);
//   return response.data;
// };

// Delete a URL
export const deleteUrl = async (urlId: string): Promise<DeleteResponse> => {
  const response = await userAxiosInstance.delete<DeleteResponse>(`/urls/${urlId}`);
  return response.data;
};


