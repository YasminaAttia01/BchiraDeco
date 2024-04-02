import { useContext, useEffect, useState } from "react";
import "./products.scss";


import Pagination from "../parts/pagination/Pagination";
import { ProductStore } from "../../context/ProductsContext";
import Modal from "../modal/Modal";
import { AnimatePresence } from "framer-motion";
import { backLink } from "../../utils/AxiosConfig";

function Products({ category }) {
  const { products } = useContext(ProductStore);
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState(products);
  const [product , setProduct] = useState({})

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {
    setPosts(
      products.filter((post) =>
       {   setCurrentPage(1)
        return category === "all" ? true : post.category === category
      }
      )
    );
  }, [category, products,]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <>
      <div className="products-container">
        <ul className="list-group">
          {currentPosts.map((post) => (
            <div
              key={post._id}
              className="list-group-item"

            >
              <img src={backLink + post.images[0]} alt="" />
              <h3> {post.title}</h3>
            <div>  <h5>{post.brand}</h5>
              <p>{post.price} DT</p></div>
              <button    onClick={() => {setOpenModal(true); setProduct(post)} }>voir plus</button>
            </div>
          ))}
        </ul>
        <AnimatePresence>
          {openModal ? (
            <Modal openModal={openModal} product={product}  setOpenModal={setOpenModal} />
          ) : null}
        </AnimatePresence>
        <Pagination
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default Products;
