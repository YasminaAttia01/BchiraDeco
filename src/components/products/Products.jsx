import { useEffect, useState } from "react";
import "./products.scss";
import axios from "axios";
import Pagination from "../parts/descriptionBox/pagination/Pagination";

function Products() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
  
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
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
      <ul className='list-group mb-4'>
      {currentPosts.map(post => (
        <div key={post.id} className='list-group-item'>
          {post.title}
          <img src={post.image} alt="" />
        </div>
      ))}
    </ul>
    <Pagination  postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}/>
    </div>
  )
}

export default Products
