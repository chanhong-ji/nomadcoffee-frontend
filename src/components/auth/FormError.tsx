import styled from "styled-components";

interface IProps {
  text: string | null;
}

const Container = styled.div`
  span {
    font-size: 20px;
    color: orange;
  }
`;

function FormError({ text }: IProps) {
  if (text === null) return null;
  return (
    <Container>
      <span>{text}</span>
    </Container>
  );
}

export default FormError;
