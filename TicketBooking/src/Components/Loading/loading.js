import styled from "styled-components";

import loading from "./../../assets/midias/loading.gif";

function Loading() {
  return (
    <Div>
      <img src={loading} alt="loading" />
      <p>Loading...</p>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: 15px;
  }

  p {
    font-size: 30px;
    font-weight: 700;
  }
`;

export default Loading;
