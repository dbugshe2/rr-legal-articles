import { routes } from "constants/routes";
import { Link } from "react-router-dom";
import { CreateArticle } from "ui/components";

export const CreateArticlePage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center container">
      <h1 className="text-4xl">CreateArticlePage</h1>
      <Link to={routes.results.path}>Go Back</Link>
      <CreateArticle />
    </div>
  );
};
