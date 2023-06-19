import Navbar from "@/components/Navbar/Navbar";
import SearchNavbar from "@/components/Navbar/SearchNavbar";
import styled from "styled-components";
import authenticateUser from "./authMiddleware";
import { InnerLayout } from "@/styles/innerLayout.styles";
import PublicVideo from "@/components/home/PublicVideo";

function Home() {
  async function onShare() {
    await navigator.share({
      title: "Best React Framework",
      url: "https://nextjs.com"
    });
  }
  return (
    <>
      <Layout>
        <Navbar />

        <InnerLayout>
          <SearchNavbar />
          <PublicVideo />
        </InnerLayout>
      </Layout>
    </>
  );
}

export default authenticateUser(Home);

const Layout = styled.div`
  display: flex;
`;
