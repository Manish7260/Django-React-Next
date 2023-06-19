import SettingNavbar from "@/components/settings/SettingsNavbar";
import SearchNavbar from "@/components/Navbar/SearchNavbar";
import Account from "@/components/settings/Account";
import { InnerLayout } from "@/styles/innerLayout.styles";
import authenticateUser from "../authMiddleware";
import styled from "styled-components";

function Settings() {
  return (
    <>
      <Layout>
        <SettingNavbar />

        <InnerLayout>
          <SearchNavbar />
          <Account />
        </InnerLayout>
      </Layout>
    </>
  );
}

export default authenticateUser(Settings);

const Layout = styled.div`
  display: flex;
`;
