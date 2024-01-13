import { IResultItem } from "types";
import { Avatar, AvatarFallback, Button } from "..";
import { formatDate, getInitials, truncateText } from "ui/utils";
import { Link } from "react-router-dom";

interface PropType {
  data: IResultItem;
}

export const ResultItem = ({ data }: PropType) => {
  return (
    <div className="flex gap-2">
      <div>
        <Avatar>
          <AvatarFallback>{getInitials(data.author.name)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="text-lg font-semibold">{data.title}</div>
        {/* limit to old timey tweets */}
        <div>{truncateText(data.content, 240)}</div>
        <div className="flex justify-between w-full">
          <div className="flex gap-4">
            <p className="text-sm text-card-foreground">{formatDate(data.publishedAt)}</p>
            <p className="text-sm text-slate-600">By: {data.author.name}</p>
          </div>
          <Button variant={"outline"} asChild>
            <Link to={`article/${data.id}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
