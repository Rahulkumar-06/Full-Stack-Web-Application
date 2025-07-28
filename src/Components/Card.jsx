import {useNavigate} from "react-router-dom";
import UseFetchimg from "./useFetchimg";
function Card(props){
  const navigate = useNavigate();
    const imageUrl = UseFetchimg(props.id); 
  return(
  <>
  <div
  className="card shadow-sm hover-card"
  style={{
    width: '18rem',
    borderRadius: '12px',
    backgroundColor: '#9aa8b9a8', 
    cursor: 'pointer'
  }}
>


  
  {/* Product Image */}
  <img
    src={imageUrl|| "placeholder.jpg"}
    className="card-img-top"
    alt={props.productName}
    style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
  />

  {/* Card Body */}
 <div className="card-body text-center">
    <h5 className="card-title fw-bold">{props.productName}</h5>
    <h6 className="card-subtitle mb-3 text-muted">₹{props.price}</h6>
    <hr />
    <button
      className="btn btn-primary w-100"
      onClick={() => navigate("/product/" + props.id)}
    >
      See Details
    </button>
  </div>
</div>

 {/* <div className="card-body1">
          <h5 className="card-title fw-bold">{props.productName}</h5>
          <h6 className="card-subtitle mb-3 text-muted"> ₹{props.price}</h6>
          <hr />
          <button className="btn btn-primary w-100" onClick={()=>navigate("/product/"+props.id)}>See Details</button>
  </div> */}
  </>
  );
}
export default Card;
