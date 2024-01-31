import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
function Header({ home }) {
  const navigate = useNavigate();

  return (
    <Cineflex>
      {home ? (
        <></>
      ) : (
        <ion-icon name="arrow-undo-sharp" onClick={() => navigate(-1)}></ion-icon>
      )}
      <h1>BOOK-TICKETS</h1>
    </Cineflex>
  );
}

const Cineflex = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--available);
  width: 100%;
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: var(--orange);
    font-size: 34px;
    line-height: 40px;
  }

  ion-icon{
    font-size: 30px;
    color: var(--orange);
    position: absolute;
    top: 18px;
    left: 20px;
  }
`;

export default Header;
