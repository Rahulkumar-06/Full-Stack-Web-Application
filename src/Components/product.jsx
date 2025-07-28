import { useParams, useNavigate } from "react-router-dom";
import UseFetch from "./useFetch";
import UseFetchimg from "./useFetchimg";
import axios from "axios";
function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, error] = UseFetch("http://localhost:8080/prod/" + id);
  const imageUrl = UseFetchimg(data?.id);
  return (
    <>
      {error && !data && (
        <div className="container mt-4 d-flex justify-content-center">
          <div className="alert alert-danger w-50 text-center shadow-sm" role="alert">
            <h5 className="mb-0">🚫 Error: {error}</h5>
          </div>
        </div>
      )}

      {data && (
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card shadow-lg position-relative" style={{ width: '22rem', borderRadius: '15px' }}>
                      
                    <button
            className="btn btn-sm btn-success position-absolute top-0 end-0 m-2"
            onClick={() => navigate(`/productedit/${data.id}`)}
            title="Edit"
          >
            <i className="bi bi-pencil-fill me-1"></i>Edit
          </button>

            {/* Product Image */}
            <img
              src={imageUrl}
              className="card-img-top"
              alt={data.productName}
              style={{
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                height: '200px',
                objectFit: 'cover',
              }}
            />

            <div className="card-body text-center">
              <h3 className="card-title mb-3">{data.productName}</h3>
              <h5 className="card-text text-success">Price: ₹{data.price}</h5>
              <hr />

              {/* Order Now Button */}
              <a
                href={`mailto:rahulkumarc679@gmail.com?subject=Order Request for ${data.productName}&body=Hello, I would like to place an order for ${data.productName} priced at ₹${data.price}.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary mt-3">Order Now</button>
              </a>
            </div>

          <button
            className="btn btn-danger btn-sm position-absolute bottom-0 end-0 m-2"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this item?")) {
                axios.delete(`http://localhost:8080/del/${data.id}`,{withCredentials: true})
                  .then(() => {
                    navigate('/cards'); 
                  })
                  .catch((error) => {
                    console.error("Delete failed:", error);
                    alert("Failed to delete. Try again.");
                  });
              }
            }}
            >
              Delete
            </button>

          </div>
          
        </div>
      )}
    </>
  );
}

export default Product;
