import Navbar from "@/components/Navbar/Navbar";
import SearchNavbar from "@/components/Navbar/SearchNavbar";
import styled from "styled-components";
import authenticateUser from "../authMiddleware";
import { InnerLayout } from "@/styles/innerLayout.styles";
import PublicVideo from "@/components/home/PublicVideo";
import LikedVideoList from "@/components/Liked/LikedVideoList";

function Home() {
  return (
    <>
      <Layout>
        <Navbar />

        <InnerLayout>
          <SearchNavbar />
          <LikedVideoList />
        </InnerLayout>
      </Layout>
    </>
  );
}

export default authenticateUser(Home);

const Layout = styled.div`
  display: flex;
`;
