import "./pagination.scss";

const Pagination = ({ postsPerPage, totalPosts, paginate ,currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <p onClick={() => paginate(number)} style={{color:currentPage===number?'red':'black'}} className='page-link'>
              {number}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;