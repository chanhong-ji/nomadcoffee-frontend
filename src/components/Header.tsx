import { useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserLogout, isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";

const Container = styled.header`
  height: 100px;
  width: 100%;
  position: fixed;
  background-color: gainsboro;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div``;

const Title = styled.div``;

const Items = styled.div``;

const Item = styled.div``;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const meData = useUser();
  const navigate = useNavigate();
  return (
    <Container>
      <Column>
        <Items>
          <Items onClick={() => navigate("/")}>Home</Items>
        </Items>
      </Column>
      <Column>
        {isLoggedIn ? (
          <Items>
            <Item onClick={getUserLogout}>Logout</Item>
          </Items>
        ) : (
          <Items>
            <Item onClick={() => navigate("/login")}>Login</Item>
            <Item onClick={() => navigate("/signup")}>Sign Up</Item>
          </Items>
        )}
      </Column>
    </Container>
  );
}

export default Header;
