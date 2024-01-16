import { useLegalArticles } from "app/hooks";
import { Results } from "ui/components";

export const ResultsPage: React.FC = () => {
  const { data, isLoading } = useLegalArticles();
  return (
    <div className="overflow-hidden">
      <Results data={data} isLoading={isLoading} />
    </div>
  );
};
