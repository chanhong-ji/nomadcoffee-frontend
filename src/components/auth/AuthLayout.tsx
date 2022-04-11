import styled from "styled-components";

const Container = styled.section`
  max-width: 600px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 30px;
  background-color: pink;
  display: flex;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
  }
`;

function AuthLayout({ children }: any) {
  return <Container>{children}</Container>;
}

export default AuthLayout;
