import { useQuery } from "@tanstack/react-query";

export interface YoutubeVideo {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt: string;
}

interface YoutubeSearchSnippet {
  title?: string;
  description?: string;
  channelTitle?: string;
  publishedAt?: string;
  thumbnails?: {
    high?: { url?: string };
    medium?: { url?: string };
    default?: { url?: string };
  };
}

interface YoutubeSearchItem {
  id?: {
    videoId?: string;
  };
  snippet?: YoutubeSearchSnippet;
}

interface YoutubeSearchResponse {
  items?: YoutubeSearchItem[];
  error?: {
    message?: string;
  };
}

interface FetchYoutubeParams {
  query: string;
  maxResults: number;
  apiKey: string;
  signal: AbortSignal;
}

async function fetchYoutubeVideos({
  query,
  maxResults,
  apiKey,
  signal,
}: FetchYoutubeParams): Promise<YoutubeVideo[]> {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("q", query);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url.toString(), { signal });
  const payload = (await response.json()) as YoutubeSearchResponse;

  if (!response.ok) {
    const message = payload?.error?.message || "Failed to search YouTube";
    throw new Error(message);
  }

  return (payload.items || [])
    .map((item) => {
      const videoId = item?.id?.videoId;
      if (!videoId) return null;
      const snippet = item.snippet || {};
      const thumbnailUrl =
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url ||
        "";

      return {
        id: videoId,
        title: snippet.title || "YouTube Video",
        description: snippet.description || "",
        channelTitle: snippet.channelTitle || "",
        thumbnailUrl,
        publishedAt: snippet.publishedAt || "",
      };
    })
    .filter(Boolean) as YoutubeVideo[];
}

export function useYoutubeSearch(query: string, maxResults = 4) {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  return useQuery({
    queryKey: ["youtube-search", query, maxResults],
    queryFn: ({ signal }) => {
      if (!apiKey) {
        return Promise.reject(new Error("Missing YouTube API key"));
      }
      return fetchYoutubeVideos({ query, maxResults, apiKey, signal });
    },
    enabled: Boolean(apiKey) && Boolean(query),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
}
