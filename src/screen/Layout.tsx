import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 200vh;
  width: 100vw;
`;

const Header = styled.header`
  height: 100px;
  width: 100%;
  position: fixed;
  background-color: gainsboro;
`;

const Main = styled.main`
  height: 100%;
  padding-top: 100px;
`;

function Layout() {
  return (
    <Container>
      <Header></Header>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

export default Layout;
