import axios from "axios";
import { useNavigate } from "react-router-dom";
function LogOut()
{
    let config = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    }
    const navigator = useNavigate()

    axios
      .get("http://127.0.0.1:8000/logout/", config)
      .then((response) => {
        console.log(response.data)
        localStorage.setItem('access_token',"")
        navigator('/login');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("Bad request:", error.response.data);
        } else {
          console.log("Request failed:", error.message);
        }
        console.log(localStorage.getItem('access_token'))
      });
}
export default LogOut;