import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <div>
      <h1> 404: This page doesn't exist. </h1>
      <Link to="/">Go back to home.</Link>
    </div>
  );
};
