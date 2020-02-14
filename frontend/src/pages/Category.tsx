import React from "react";
import { useParams } from "react-router-dom";

const Category: React.FC = () => {
  console.log("this is the category component");
  let { category } = useParams();
  return <div>{category}</div>;
};

export default Category;
