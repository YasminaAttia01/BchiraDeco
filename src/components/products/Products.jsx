import { useContext, useEffect, useState } from "react";
import "./products.scss";
import axios from "axios";
import Pagination from "../parts/pagination/Pagination";
import { ProductStore } from "../../context/ProductsContext";

function Products({category}) {

  const products=useContext(ProductStore)
    const [posts, setPosts] = useState(products);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
 
   
    useEffect(() => {
      setPosts(products.filter((post) =>category==="all"?true: post.category === category));
    }, [category]);
  
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <div className='products-container'>
      <ul className='list-group' >
      {currentPosts.map(post => (
        <div key={post.id} className='list-group-item'>
          <img src={post.image} alt="" />
         <h3> {post.title}</h3>
         <h5>marque</h5>
         <p>{post.price}</p>
        </div>
      ))}
    </ul>
    <Pagination  postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPosts={posts.length}
        paginate={paginate}/>
    </div>
  )
}

export default Products
