/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IResultItem } from "types";
import { Button, EmptyState, Input } from "..";
import { PlusCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { routes } from "constants/routes";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../base/pagination";
import usePagination from "headless-pagination-react";
import { ResultItem } from "./resultItem";

interface PropType {
  data?: any[];
  isLoading?: boolean;
}

export const Results = (props: PropType = { data: [], isLoading: false }) => {
  const { links, hasNext, hasPrevious, onNext, onPrevious } = usePagination({
    totalItems: props.data?.length || 0, // required
    perPage: 20, // optional
    maxLinks: 7, // optional
    initialPage: 1, // optional
  });

  const handleSearch = () => {
    console.log("searching...");
  };
  return (
    <div className="flex flex-col relative">
      {/* page header */}
      <header className="fixed shadow-md px-8 shadow-accent z-50 bg-background h-48 gap-8 top-0 right-0 left-0 flex flex-col justify-center">
        {/* page title */}
        <h1 className="font-bold text-4xl text-center">RR Legal</h1>
        {/* search */}
        <form onSubmit={handleSearch} action="" className="flex gap-4">
          {/* search field */}
          <Input placeholder="search for existing articles by author name or title." />
          {/* search button */}
          <Button type="submit">
            {props.isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
            Search
          </Button>
        </form>
        {/* pagination count */}
        <span className="text-slate-800 text-sm">
          {/* showing {props?.data?.length} of {props?.data?.length} articles */}
        </span>
      </header>
      {/* header placeholder */}
      <div className="h-48 " />
      <main className="flex h-full relative flex-col justify-center gap-4 p-4">
        <div className="flex flex-col ">
          {/* results */}
          {props?.data?.length ? (
            props?.data?.map?.((item: IResultItem, itemIndex: number) => (
              <ResultItem key={`${itemIndex}`} data={item} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
        {/* pagination placeholder */}
        <div className="h-16" />
      </main>
      {/* pagination */}
      <div className="h-16 flex justify-center bg-secondary fixed bottom-0 left-0 right-0">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button variant={"outline"} disabled={!hasPrevious} onClick={onPrevious}>
                <PaginationPrevious href="#" />
              </Button>
            </PaginationItem>
            {links?.map?.((link, linkIndex) => {
              return (
                <PaginationItem key={`${linkIndex}`}>
                  <Button variant={link.active ? "default" : "outline"}>{link.label}</Button>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button variant={"outline"} disabled={!hasNext} onClick={onNext}>
                <PaginationNext href="#" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {/* create article */}
      <div className="fixed bottom-20 right-10">
        <Button size="lg" className="rounded-sm">
          <Link to={routes.createArticle.path} className="flex items-center">
            <PlusCircledIcon height={24} width={24} className="mx-2" /> Create Article
          </Link>
        </Button>
      </div>
    </div>
  );
};
