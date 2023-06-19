import Navbar from "@/components/Navbar/Navbar";
import ChannelData from "@/components/channel/ChannelData";
import SearchNavbar from "@/components/Navbar/SearchNavbar";
import { InnerLayout } from "@/styles/innerLayout.styles";
import authenticateUser from "../authMiddleware";
import styled from "styled-components";

function Settings() {
  return (
    <>
      <Layout>
        <Navbar />

        <InnerLayout>
          <SearchNavbar />
          <ChannelData />
        </InnerLayout>
      </Layout>
    </>
  );
}

export default Settings;

const Layout = styled.div`
  display: flex;
`;
