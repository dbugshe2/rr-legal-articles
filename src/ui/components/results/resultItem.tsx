/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// import { IResultItem } from "types";
import { Avatar, AvatarFallback } from "..";
import { getInitials } from "ui/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../base/accordion";
import ReactHtmlParser from "html-react-parser";

// interface PropType {
//   data: unknown;
// }

export const ResultItem = ({ data }: Record<string, any>) => {
  return (
    <Accordion type="single" collapsible className="max-w-full">
      <AccordionItem value="item-1" className="bg-white border-1 px-4 rounded-sm">
        <AccordionTrigger>
          <div className="flex gap-2">
            <div>
              <Avatar>
                <AvatarFallback>{data?.body?.author ? getInitials(data?.body?.author) : "M E"}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="text-xl font-semibold text-left">{data?.title}</div>
              {/* limit to old timey tweets */}
              <div className="flex justify-between w-full">
                <div className="flex gap-4">
                  <p className="text-sm font-light text-secondary-foreground">
                    {new Date(data?.publishedAt || Date.now()).toLocaleString()}
                  </p>
                  <p className="text-sm text-foreground">By: {data?.body?.author || "you"}</p>
                </div>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-secondary p-8 text-wrap">
          {ReactHtmlParser(`${data?.body?.content}`)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
