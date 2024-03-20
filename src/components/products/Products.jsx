import { useEffect, useState } from "react";
import "./products.scss";
import axios from "axios";
import Pagination from "../parts/pagination/Pagination";

function Products() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
  console.log(posts);
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('https://fakestoreapi.com/products');
        setPosts(res.data);
        setLoading(false);
      };
      fetchPosts();
    }, []);
  
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
