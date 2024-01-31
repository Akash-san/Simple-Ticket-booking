
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function BookedMovieDetails({ movieDetails, moviePoster }) {
  const firstUserName = movieDetails.buyers.length > 0 ? movieDetails.buyers[0].name : "";
  const bookedSeats = movieDetails.buyers.map(buyer => buyer.seatId).join(", ");

  return (
    <Container>
      <Card>
        <h2>Booked Movie Details</h2>
        {moviePoster && <MoviePoster src={moviePoster} alt="Movie Poster" />}
        <p><strong>Movie Name:</strong> {movieDetails.title}</p>
        <p><strong>Day and Time:</strong> {movieDetails.day}</p>
        <p><strong>Booked User:</strong> {firstUserName}</p>
        <p><strong>Booked Seats:</strong> {bookedSeats}</p>
        <Link to="/home">
          <button >Return To Home</button>
        </Link>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const MoviePoster = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

export default BookedMovieDetails;

