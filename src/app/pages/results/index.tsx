import { routes } from "constants/routes";
import { Link } from "react-router-dom";

export const ResultsPage = () => {
  return (
    <div>
      <h1>ResultsPage</h1>
      <Link to={routes.createArticle.path}>Create Article</Link>
    </div>
  );
};
