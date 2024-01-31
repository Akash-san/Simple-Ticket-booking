import styled from "styled-components";

function Seat({ seat, selected, setSelected }) {
  return (
    <Div
      color={
        !selected.includes(seat.id)
          ? seat.isAvailable
            ? {
                color: "var(--available)",
                border: "var(--available-border)",
              }
            : {
                color: "var(--unavailable)",
                border: "var(--unavailable-border)",
              }
          : { color: "var(--selected)", border: "var(--selected-border)" }
      }
      onClick={() => {
        if (seat.isAvailable) {
          if (!selected.includes(seat.id)) {
            setSelected([...selected, seat.id]);
          } else {
            if (window.confirm("Do You Want To Remove it")) {
              selected.splice(selected.indexOf(seat.id), 1);
              setSelected([...selected]);
            }
          }
        } else {
          alert("Seat Is Unavailable");
        }
      }}
    >
      {seat.name}
    </Div>
  );
}

const Div = styled.button`
  width: 26px;
  height: 26px;
  font-size: 11px;
  color: #000000;
  margin: 0 7px 18px 0;
  border-radius: 12px;
  padding: 0;
  border: 1px solid;
  background-color: ${(props) => props.color.color};
  border-color: ${(props) => props.color.border};
`;

export default Seat;
