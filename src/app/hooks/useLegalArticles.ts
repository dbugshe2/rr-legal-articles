import { ArticlesApi } from "app/service";
import { swrKeys } from "constants/swrKeys";
import useSwr from "swr"

export function useLegalArticles() {

    const fetcher = async () => await ArticlesApi.fetchAllArticles()


    return useSwr(swrKeys.allArticles, fetcher)
}
