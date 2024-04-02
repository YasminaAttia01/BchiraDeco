import React, { useContext, useEffect, useState } from "react";
import CommandBox from "../parts/CommandBox";
import Pagination from "../../components/parts/pagination/Pagination";
import { orderStore } from "../../context/OrderContext";

function Commands() {
  const { order, dispatchOrder } = useContext(orderStore);
  const [commands, setCommands] = useState([]);
  useEffect(() => {
    setCommands(
      order.filter((item) => {
        return item.status === "pending";
      })
    );
  }, [order]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = commands?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="commands-container">
      {currentPosts.map((post) => (
        <CommandBox key={post.id} post={post} dispatchOrder={dispatchOrder} />
      ))}
      <Pagination
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPosts={commands.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Commands;
