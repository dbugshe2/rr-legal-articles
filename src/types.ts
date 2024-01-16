export type RouteItem = {
  path: string;
  name: string;
};
export interface IResultItem {
  body: {
    author: string;
    content: string;
  };
  id: string;
  userId: string;
}
