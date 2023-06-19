import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import authenticateUser from "../authMiddleware";
import { useEffect } from "react";

function LogOut() {
  const router = useRouter();

  const handleLogout = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios
      .get("http://127.0.0.1:8000/logout/", config)
      .then((response) => {
        console.log(response.data);

        Cookies.set("isAuthenticated", false);
        localStorage.setItem("access_token", "");
        localStorage.setItem("refresh_token", "");
        router.push("/auth/login");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log("Bad request:", error.response.data);

          router.push("/auth/login");
        } else {
          console.log("Request failed:", error.message);

          router.push("/auth/login");
        }
      });
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
}
export default authenticateUser(LogOut);
