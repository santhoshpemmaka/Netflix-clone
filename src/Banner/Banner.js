import React, { useState, useEffect } from "react";
import axios from "../Request/axios";
import request from "../Request/request";
import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original";

function Banner() {
  const [movie, setMovie] = useState();
  const backgroundImage = `${base_url}${movie?.backdrop_path}`;
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(request.fetchActionMovies);
      const movie_num = Math.floor(Math.random() * res.data.results.length - 1);
      setMovie(res.data.results[movie_num]);
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
      ${backgroundImage}
    )`,
        backgroundPosition: "centre centre"
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h2 className="banner_description">
          {truncate(movie && movie.overview, 150)}
        </h2>
      </div>
      <div className="banner-fadeBottom"></div>
    </header>
  );
}

export default Banner;
