import { useEffect,useState } from "react";
import axios from "axios";

const UseFetchimg = (id)=>{
      const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
  let isMounted = true;
  let objectUrl;

  axios.get(`http://localhost:8080/image/${id}`, {
      withCredentials: true,
      responseType: "blob"
    })
    .then((response) => {
      if (isMounted) {
        objectUrl = URL.createObjectURL(response.data);
        setImageUrl(objectUrl);
      }
    })
    .catch((err) => {
      console.error("Image fetch error:", err);
    });
     return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
    }, [id]);
    return(imageUrl)
}
export default UseFetchimg;