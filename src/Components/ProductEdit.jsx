import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductEdit(){
   const{id}=useParams();
   const [preview , setPreview]= useState(null);
    const [file, setFile] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); 

        const [product,setProduct] = useState({
            productName : '',
            price    : ''
        });
         useEffect(() => {
    axios.get(`http://localhost:8080/prod/${id}`,{ withCredentials: true})
      .then(res => {
        setProduct({
          productName: res.data.productName,
          price: res.data.price
        });
        setPreview(res.data.imageUrl);
      })
      .catch(err => console.error(err));
  }, [id]);
    const Handilchange =(e)=>{
        const {name,value}= e.target;
        setProduct((prev)=>({
            ...prev,
            [name] : value
        }));
    };
     // Handle file input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Preview the selected file
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
 const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    if (file) formData.append("file", file);

    axios.put(`http://localhost:8080/Update/${id}`,formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" }
    })
  .then(() => {
  setAlertMessage("Product updated successfully!");
  setAlertType("success");
})
.catch(err => {
  console.error("Error updating:", err);
  setAlertMessage("Error updating product!");
  setAlertType("danger");
});
setTimeout(() => {
  setAlertMessage('');
}, 5000);
}
     return (
<>
    <div className="container mt-5">

            <form className="p-4 border rounded bg-light" encType="multipart/form-data" onSubmit={handleSubmit}>
            <h4 className="mb-4">Edit Product</h4>
             <label htmlFor="productImage" className="form-label">Product Image</label>
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
            onChange={handleFileChange}
            />
            </div>

        <div className="mb-3">
            <label htmlFor="productName" className="form-label">Product Name</label>
                <input
                type="text"
                className="form-control"
                id="productName"
                name="productName"
                onChange={Handilchange}
                value={product.productName}
               

        />
                </div>

            <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">Price</label>
                <input
                type="number"
                className="form-control"
                id="productPrice"
                name="price"
                onChange={Handilchange}
                value={product.price}

                //   onChange={(e) => setProductPrice(e.target.value)}
                />
            </div>
            {alertMessage && (
         <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
          {alertMessage}
       <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>
)}

       <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
    </div>
</>
);



}
export default ProductEdit;