import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const authenticateUser = (WrappedComponent) => {
  const AuthMiddleware = (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = Cookies.get("isAuthenticated");

      if (isAuthenticated === "false") {
        router.push("/auth/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthMiddleware;
};

export default authenticateUser;
