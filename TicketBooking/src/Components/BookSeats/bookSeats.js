
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Seats from "./../Seats/seats";
import Footer from "./../Footer/footer";
import Loading from "../Loading/loading";
import BookedMovieDetails from "./../BookSeatsDetails/seatDetails";

function BookSeats({ setMovie }) {
  const [session, setSession] = useState({ seats: [] });
  const [selected, setSelected] = useState([]);
  const [booked, setBooked] = useState({});
  const [showBookedDetails, setShowBookedDetails] = useState(false);

  const navigate = useNavigate();
  const { idSession } = useParams();
  let disabled = true;

  function updateSelected(selected) {
    booked.buyers = [];
    selected.forEach((seat) => {
      booked.buyers.push({
        seatId: parseInt(seat),
        name: "",
        mobile: "",
      });
    });
    booked.ids = [...selected];
    setBooked({ ...booked });
    setSelected([...selected]);
  }

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`
    );
    promise.then((response) => {
      setSession(response.data);
    });
    promise.catch((err) => console.log(err.status, err.message));
  }, []);

  function sendData(e) {
    e.preventDefault();
    if (validateInput()) {
      setMovie({
        title: session.movie.title,
        day: `${session.day.date} ${session.name}`,
        buyers: booked.buyers,
      });
      setShowBookedDetails(true);
    } else {
      alert("Invalid mobile number");
    }
  }

  function validateInput() {
    const mobileNumbers = booked.buyers.map((buyer) => buyer.mobile);
    const validMobileNumbers = mobileNumbers.filter((mobile) => /^\d{10}$/.test(mobile));
    return mobileNumbers.length === validMobileNumbers.length;
  }

  function enableButton() {
    const input = [];
    booked.buyers.forEach((buyer, index) => {
      input.push(!buyer.mobile || !buyer.name);
    });
    let final = input[0];
    input.forEach((bool) => (final = final || bool));
    disabled = disabled && final;

    return disabled;
  }

  const seats = session.seats;
  const day =
    seats.length > 0 ? `${session.day.weekday} - ${session.day.date}` : "";

  return (
    <>
      <Main className="BookSeats">
        <h2>Select your seat(s)</h2>
        <Seats seats={seats} setSelected={updateSelected} selected={selected} />
        {selected.length > 0 ? (
          <>
            <form onSubmit={sendData}>
              {selected.sort().map((seat, index) => {
                return (
                  <div key={index}>
                    <p>Seat {seat % 50 !== 0 ? seat % 50 : 50}</p>
                    <label>Buyer's Name</label>
                    <input
                      value={booked.buyers[index].name}
                      onChange={(e) => {
                        booked.buyers[index].name = e.target.value;
                        setBooked({ ...booked });
                      }}
                      placeholder="Enter your name"
                      name="name"
                      required
                    ></input>
                    <label>Mobile Number</label>
                    <input
                      onChange={(e) => {
                        booked.buyers[index].mobile = e.target.value;
                        setBooked({ ...booked });
                      }}
                      placeholder="Enter your 10-digit mobile number"
                      type="tel"
                      name="mobile"
                      required
                    ></input>
                  </div>
                );
              })}
              <button type="submit" disabled={enableButton()}>
                Book Seat(s)
              </button>
            </form>
            {showBookedDetails && (
              <BookedMovieDetails
                movieDetails={{
                  title: session.movie.title,
                  day: `${session.day.date} ${session.name}`,
                  buyers: booked.buyers,
                }}
              />
            )}
          </>
        ) : (
          <></>
        )}
      </Main>


      <Footer
        img={session.movie ? session.movie.posterURL : ''}
        details={[session.movie ? session.movie.title : '', day]}
      />



    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px 24px 170px;

  h2 {
    line-height: 91px;
  }

  form {
    width: 100%;
    margin-top: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form p {
    font-size: 20px;
    line-height: 40px;
    font-weight: 600;
  }

  form label {
    font-size: 18px;
    line-height: 21px;
  }

  form input {
    margin-bottom: 7px;
    width: 100%;
    height: 51px;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    padding-left: 18px;
    font-size: 18px;
  }

  form input::placeholder {
    color: #afafaf;
    font-style: italic;
    opacity: 0.8;
  }

  form button {
    width: 225px;
    height: 42px;
    margin-top: 50px;
    line-height: 21px;
  }

  form button:disabled {
    opacity: 0.5;
  }
`;

export default BookSeats;

