import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Register from './Components/Register'
import Login from './Components/Login'
import {createBrowserRouter , RouterProvider}from 'react-router-dom'
import NotFound from './Components/Notfound'
import CardManager from './Components/CardManager'
import Product from './Components/product'
import ProductEdit from './Components/ProductEdit'
import AddProduct from './Components/AddProduct'
 const router = createBrowserRouter([
 {
  path : '/',
  element : <Login/>,
  errorElement: <NotFound/>
 },{
  path : '/register',
  element : <Register/>
 },
 {
  path : '/cards',
  element : <CardManager/>
 },
 {
  path : '/product/:id',
  element : <Product/>
 },
 {
  path : '/productedit/:id',
  element : <ProductEdit/>
 },{
  path : '/addproduct',
  element : <AddProduct/>
 }
]);
createRoot(document.getElementById('root')).render(
 
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
