import React from "react";
import HomeContent from "../seed/home";
import { Link } from "react-router-dom";
import FeaturedTiles from './../components/FeaturedTiles'

const Home: React.FC = () => {
  let contentTiles = [];
  for (const contentObject of HomeContent.content) {
    contentTiles.push(
      <div key={contentObject.slug}>
        <Link to={`/${contentObject.slug}`}>
          <div key={contentObject.title}>{contentObject.title}</div>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <FeaturedTiles />
      {contentTiles}
    </div>);
};

export default Home;
