import { useContext, useState } from "react";
import axiosConfig from "../../utils/AxiosConfig";
import { authStore } from "../../context/AuthContext";

function AddProduct() {
const {auth}=useContext(authStore)
  const [product,setProduct]=useState({})

  const hundleAddProduct = (e) => {
    e.preventDefault();
    const formData=new FormData()
    for (let i = 0; i < product.images.length; i++) {
      formData.append('images', product.images[i]);
  }
    formData.append('title',product.title)
    formData.append('brand',product.brand)
    formData.append('size',product.size)
    formData.append('price',product.price)
    formData.append('category',product.category)
    formData.append('color',product.color)
    axiosConfig.post('/products',formData,{headers:{'Content-Type':'multipart/form-data',Authorization:`Bearer ${auth}`}}).then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className="add-product">
      <h2>Add article</h2>
      <form action="" onSubmit={hundleAddProduct}>
        <input type="file" name="images" id="images" multiple onChange={e=>setProduct({...product,images:e.target.files})} />
        <div className="inputs">
          <label>Nom de l'article</label>{" "}
          <input type="text" name="productTitle" onChange={e=>setProduct({...product,title:e.target.value})} />
        </div>
        <div className="inputs">
          <label>Marque</label> <input type="text" name="brand" onChange={e=>setProduct({...product,brand:e.target.value})} />
        </div>
        <div className="inputs">
          <label>Taille</label>{" "}
          <select name="size" onChange={e=>setProduct({...product,size:e.target.value})}>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M" selected>M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="2XL">2XL</option>
            <option value="3XL">3XL</option>
            <option value="4XL">4XL</option>
          </select>
        </div>
        <div className="inputs">
          <label>Category</label>{" "}
          <select name="category" onChange={e=>setProduct({...product,category:e.target.value})}>
            <option value="tshirt">t-shirt</option>
            <option value="pant">pontalon</option>
            <option value="dress" selected>robe</option>
            <option value="shoes">chaussures</option>
            <option value="bag">sac</option>
          </select>
        </div>
        <div className="inputs">
          <label>Coleur</label> <input type="text" name="color" onChange={e=>setProduct({...product,color:e.target.value})} />
        </div>
        <div className="inputs">
          <label>Prix</label> <input type="number" name="price" onChange={e=>setProduct({...product,price:e.target.value})} />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default AddProduct;
