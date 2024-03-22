import { useContext, useEffect, useState } from "react";
import "./products.scss";
import axios from "axios";
import Pagination from "../parts/pagination/Pagination";
import { ProductStore } from "../../context/ProductsContext";
import Modal from "../modal/Modal";
import { AnimatePresence } from "framer-motion";

function Products({category}) {

  const {products}=useContext(ProductStore)
  const [openModal, setOpenModal] = useState(false);
    const [posts, setPosts] = useState(products);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
 
   
    useEffect(() => {
      setPosts(products.filter((post) =>category==="all"?true: post.category === category));
    }, [category,products]);
  
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    console.log("🚀 ~ Products ~ currentPosts:", currentPosts)
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <>
    <div className='products-container' >
      <ul className='list-group' >
      {currentPosts.map(post => (
        <div key={post.id} className='list-group-item' onClick={() => setOpenModal(true)}>
          <img src={post.image} alt="" />
         <h3> {post.title}</h3>
         <h5>marque</h5>
         <p>{post.price}</p>
        </div>
      ))}
    </ul>
    <AnimatePresence>
      {openModal ? <Modal openModal={openModal} setOpenModal={setOpenModal}/> : null}
      </AnimatePresence>
    <Pagination  postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPosts={posts.length}
        paginate={paginate}/>

    </div>
    </>
  )
}

export default Products
