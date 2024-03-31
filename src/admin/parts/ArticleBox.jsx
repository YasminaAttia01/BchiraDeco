import React from "react";

function ArticleBox({product}) {
  console.log(product);
  return (
    <div className="articleBox">
      <p>
        {product.title}
        <br />
        {product.brand}
      </p>
      <p>{product.price} DT</p>
      <span>{product._id}</span>
      <h3>
        beja
        <br />
        rue
      </h3>
      <p>date</p>

      <div className="plus">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
        </svg>
      </div>
    </div>
  );
}

export default ArticleBox;
