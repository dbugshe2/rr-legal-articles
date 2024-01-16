import { APP_USER_ID, ArticlesApi } from "app/service";
import { swrKeys } from "constants/swrKeys";
import useSwr from "swr";
import { useSessionStorage } from "usehooks-ts";

export function useLegalArticles() {
  const [value] = useSessionStorage(APP_USER_ID, []);

  const fetcher = async () => {
    const placeholder = await ArticlesApi.fetchAllArticles();
    return [...value, ...placeholder];
  };

  return useSwr(swrKeys.allArticles, fetcher);
}
