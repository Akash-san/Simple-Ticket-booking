import styled from "styled-components";
import Seat from "../Seat/seat";

function Seats({ seats, setSelected, selected }) {
  const label = [
    {
      title: "Selected",
      color: "var(--selected)",
      border: "var(--selected-border)",
    },
    {
      title: "Available",
      color: "var(--available)",
      border: "var(--available-border)",
    },
    {
      title: "Unavailable",
      color: "var(--unavailable)",
      border: "var(--unavailable-border)",
    },
  ];

  return (
    <Section className="Seats">
      {seats.map((seat) => {
        return (
          <Seat
            seat={seat}
            selected={selected}
            setSelected={setSelected}
            key={seat.id}
          />
        );
      })}
      <div className="label">
        {label.map(({ title, color, border }) => {
          return (
            <Label key={color} color={color} border={border}>
              <div className="color"></div>
              <p>{title}</p>
            </Label>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  width: 330px;

  .label {
    display: flex;
    justify-content: space-evenly;
  }
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .color {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    border: solid 1px ${(props) => props.border};
    margin-bottom: 5px;
  }

  p {
    font-size: 13px;
    line-height: 15px;
  }
`;

export default Seats;
