import React, { useContext, useState } from "react";
import Pagination from "../../components/parts/pagination/Pagination";

import VenteBox from "../parts/VenteBox";
import { ProductStore } from "../../context/ProductsContext";

function Ventes() {
const {products}=useContext(ProductStore)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="commands-container">
      <h2>Les Ventes</h2>
      <section>
      {currentPosts.map((post) => (
        <VenteBox key={post.id} post={post} />
      ))}
      <Pagination
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPosts={products.length}
        paginate={paginate}
      /></section>
    </div>
  );
}

export default Ventes;
