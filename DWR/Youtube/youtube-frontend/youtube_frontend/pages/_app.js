import "@/styles/globals.css";
import axios from "axios";
import { useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      try {
        await refreshAccessToken();
      } catch (error) {
        console.log(error);
      }
    }, 4 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <>
    <UserProvider>
      <title>Youtube</title>
      <Component {...pageProps} />;
    </UserProvider>
    </>
  );
}

async function refreshAccessToken() {
  try {
    const refresh = localStorage.getItem("refresh_token");
    const response = await axios.post(
      "http://127.0.0.1:8000/api/token/refresh/",
      { refresh }
    );
    console.log(response.data.access);
    localStorage.setItem("access_token", response.data.access);
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}
