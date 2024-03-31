import React, { useContext, useState } from 'react'
import CommandBox from '../parts/CommandBox'
import Pagination from '../../components/parts/pagination/Pagination';
import { orderStore } from '../../context/OrderContext';


function Commands() {
  
  const {order} = useContext(orderStore)
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = order?.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
  console.log(currentPosts);
  return (
    <div className='commands-container'>
        {currentPosts.map(post => (
            <CommandBox key={post.id} post={post}/>
        ))}
        <Pagination  postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPosts={order.length}
        paginate={paginate}/>
    

      
    </div>
  )
}

export default Commands
