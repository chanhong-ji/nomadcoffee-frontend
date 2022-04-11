import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const Container = styled.div`
  height: 200vh;
  width: 100vw;
`;

const Main = styled.main`
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;
`;

function Layout() {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

export default Layout;
