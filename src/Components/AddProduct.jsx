import {useState} from "react";
import axios from "axios";
function AddProduct(){
    const [preview , setPreview]= useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); 

    const [Product,setProductData] = useState({
    productName : '',
    price : ''
    });
const [file,setFile] = useState(null);
const handilchange = (e)=>{
  const {name,value} = e.target;
  setProductData((prev)=>({
    ...prev,
    [name] : value
  }));
}
const handilfilechange = (e)=>{
    const selectedfile = e.target.files[0];
    setFile(selectedfile);
if (selectedfile) {
      setPreview(URL.createObjectURL(selectedfile));
    }
}
const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(Product)], { type: "application/json" }));
    if (file) formData.append("file", file);

    axios.post(`http://localhost:8080/add`,formData,{
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" }
    })
  .then(() => {
  setAlertMessage("Product Added successfully!");
  setAlertType("success");
})
.catch(err => {
  console.error("Error Adding:", err);
  setAlertMessage("Error Adding product!");
  setAlertType("danger");
});
setTimeout(() => {
  setAlertMessage('');
}, 5000);
}
return(
<>
<div className="container mt-5">
  <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
   <h4 className="mb-4">Add Product</h4>
    <div className="mb-3">
      <label  htmlFor="productImage" className="form-label">Product Image URL</label>
       <div className="mb-3">
                {preview && (
            <img src={preview} alt="Preview" style={{ width: "150px", marginBottom: "10px" }} />
          )}
           
            <input
            type="file"
            className="form-control"
            id="productImage"
            accept="image/*"
             name="file"
            onChange={handilfilechange}
            />
            </div>
    </div>

   
    <div className="mb-3">
      <label  htmlFor="productName" className="form-label">Product Name</label>
      <input type="text" className="form-control" onChange={handilchange} name="productName" id="productName" placeholder="Enter product name"/>
    </div>

   
    <div className="mb-3">
      <label  htmlFor="productPrice" className="form-label">Price</label>
      <input type="number" name="price" onChange={handilchange} className="form-control" id="productPrice" placeholder="Enter price"/>
    </div>

  {alertMessage && (
         <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
          {alertMessage}
       <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>
)}

   <button type="submit" className="btn btn-primary">Add Product</button>
  </form>
</div>
</>
)}
export default AddProduct;
