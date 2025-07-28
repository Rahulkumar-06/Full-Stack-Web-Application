import Card from './Card'
import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom';
// import { createContext} from 'react';
// export  const dataContext = new createContext();
function CardManager(){

  // const datas = "Data From Cardmanager";
  const [Products,error] = useFetch("http://localhost:8080/getall");
  const navigate = useNavigate();
    return(
<>
      <div className="position-fixed top-0 end-0 p-3">
      <button className="btn btn-success" onClick={()=>{navigate('/addproduct')}}>
        Add New Product
      </button>
    </div>
    {/* <dataContext.Provider value={datas}> */}
    {(error && !Products)&&(
  <div className="container mt-4 d-flex justify-content-center">
    <div className="alert alert-danger w-50 text-center shadow-sm" role="alert">
      <h5 className="mb-0">🚫 Error: {error}</h5>
    </div>
  </div>
  )}

 {(!Products)  && (
        <div className="d-flex justify-content-center align-items-center mt-5" style={{ height: '100px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {Array.isArray(Products) && Products.map((prod) => (
  <div className="d-inline-block text-white p-2" key={prod.id} >
   <Card key={prod.id}
            id={prod.id}
            productName={prod.productName} 
            price={prod.price}
            />
  </div>
))}
    {/* </dataContext.Provider> */}
   
</>
    );
};
export default CardManager;