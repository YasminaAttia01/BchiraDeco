import React, { useContext, useState } from "react";
import CommandBox from "../parts/CommandBox";
import Pagination from "../../components/parts/pagination/Pagination";
import { ProductStore } from "../../context/ProductsContext";
import ArticleBox from "../parts/ArticleBox";
import { Link } from "react-router-dom";

function Articles() {
  const { products, setProducts } = useContext(ProductStore);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="article-container">
      <h2>Les Articles</h2>
  
      <section> 
           <div className="buttons">
        <Link to={"add"}>
          <button> ⊕ Ajouter</button>
        </Link>
      </div>
        {currentPosts.map((post) => (
          <ArticleBox key={post.id} product={post} />
        ))}
    
      <Pagination
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPosts={products.length}
        paginate={paginate}
      />  </section>
    </div>
  );
}

export default Articles;
