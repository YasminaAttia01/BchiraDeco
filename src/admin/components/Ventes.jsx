import React, { useState } from "react";
import Pagination from "../../components/parts/pagination/Pagination";
import CommandBox from "../parts/CommandBox";
import VenteBox from "../parts/VenteBox";

function Ventes({ commands }) {
  const [posts, setPosts] = useState(commands);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="commands-container">
      {currentPosts.map((post) => (
        <VenteBox key={post.id} post={post} />
      ))}
      <Pagination
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Ventes;
