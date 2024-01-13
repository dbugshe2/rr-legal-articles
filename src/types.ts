export type RouteItem = {
  path: string;
  name: string;
};

export type ArticleAuthor = {
  name: string;
};
export interface IResultItem {
  author: ArticleAuthor;
  title: string;
  description: string;
  id: number;
  userId: number;
  publishedAt: string;
  content: string;
}
