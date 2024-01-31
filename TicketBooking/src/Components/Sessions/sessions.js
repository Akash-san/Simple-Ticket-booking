import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Footer from "../Footer/footer";
import Loading from "../Loading/loading";

function Sessions({ home, setHome }) {
  const { idMovie } = useParams();

  const [movie, setMovie] = useState({ days: [] });

  useEffect(() => {
    setHome(false);
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`
    );
    promise.then((response) => {
      setMovie(response.data);
    });
  }, []);

  const sessions = movie.days;

  return sessions.length > 0 ? (
    <>
      <Main>
        <h2>Select Date And Time</h2>
        <div>
          {sessions.map((day) => {
            return (
              <div key={day.id}>
                <p>
                  {day.weekday} - {day.date}
                </p>
                <div>
                  {day.showtimes.map((session) => {
                    return (
                      <Link to={`/session/${session.id}`} key={session.id}>
                        <button>{session.name}</button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Main>
      <Footer img={movie.posterURL} details={[movie.title]} />
    </>
  ) : (
    <Loading />
  );
}

const Main = styled.main`
  margin: 80px 0 140px;

  div {
    margin-left: 24px;
  }

  div > div {
    margin-bottom: 23px;
  }

  p {
    font-size: 20px;
  }

  div > div > div {
    margin: 22px 0 0 0;
  }

  button {
    margin-right: 8px;
    width: 83px;
    height: 43px;
  }
`;

export default Sessions;
