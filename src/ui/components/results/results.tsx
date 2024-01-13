import { IResultItem } from "types";
import { Button, Input } from "..";
import { ResultItem } from "./resultItem";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { routes } from "constants/routes";
const data: IResultItem[] | [] = [
  {
    title: "How to file for bankrupcy",
    author: {
      name: "Maroof Shittu",
    },
    description: "Description a short excerpt of the article",
    id: 1,
    userId: 1,
    publishedAt: "2024-01-13T19:29:14.942Z",
    content: "Content of the article",
  },
  {
    title: "How to file for bankrupcy",
    author: {
      name: "Maroof Shittu",
    },
    description: "Description a short excerpt of the article",
    id: 1,
    userId: 1,
    publishedAt: "2024-01-13T19:29:14.942Z",
    content: "Content of the article",
  },
  {
    title: "How to file for bankrupcy",
    author: {
      name: "Maroof Shittu",
    },
    description: "Description a short excerpt of the article",
    id: 1,
    userId: 1,
    publishedAt: "2024-01-13T19:29:14.942Z",
    content: "Content of the article",
  },
];

export const Results = () => {
  return (
    <div className="flex flex-col container justify-center h-screen w-screen mx-auto px-4 gap-4">
      <h1 className="font-bold text-4xl text-center">RR Legal</h1>
      <div className="flex relative flex-col justify-center gap-4 px-4">
        {/* search */}
        <div className="flex gap-4">
          <Input /> <Button>Search</Button>
        </div>
        <div className="flex flex-col gap-10 my-4">
          {/* results */}
          {data?.map?.((item: IResultItem, itemIndex: number) => <ResultItem key={`${itemIndex}`} data={item} />)}
        </div>
      </div>
      <div className="absolute bottom-8 right-8">
        <Button size="lg">
          <Link to={routes.createArticle.path} className="flex items-center">
            <PlusCircledIcon height={24} width={24} className="mx-2" /> Create Article
          </Link>
        </Button>
      </div>
    </div>
  );
};
