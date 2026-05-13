export interface Article {
  id: number;
  type: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  priority: string;
  content: string;
  author: string;
  tags: string[];
}

export const categories = [
  "All",
  "Economics",
  "Trade",
  "Energy",
  "Geopolitics",
  "Environment",
  "Technology",
];
