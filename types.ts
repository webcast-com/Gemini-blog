export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  createdAt: string;
  category?: string;
}

export interface NewsSource {
  uri: string;
  title: string;
}

export interface NewsResult {
  summary: string;
  sources: NewsSource[];
}