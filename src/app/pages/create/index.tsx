import { routes } from "constants/routes";
import { Link } from "react-router-dom";

export const CreateArticlePage = () => {
  return (
    <div>
      <h1>CreateArticlePage</h1>
      <Link to={routes.results.path}>Go Back</Link>
    </div>
  );
};
