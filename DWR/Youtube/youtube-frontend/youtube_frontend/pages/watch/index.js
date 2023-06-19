import Navbar from "@/components/Navbar/Navbar";
import SearchNavbar from "@/components/Navbar/SearchNavbar";
import styled from "styled-components";
import { InnerLayout } from "@/styles/innerLayout.styles";
import DetailVideo from "@/components/watch/DetailVideo";

function Home() {
  return (
    <>
      <Layout>
        <Navbar />

        <InnerLayout>
          <SearchNavbar />
          <DetailVideo />
        </InnerLayout>
      </Layout>
    </>
  );
}

export default Home;

const Layout = styled.div`
  display: flex;
`;
