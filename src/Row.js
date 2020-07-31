import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import YouTube from "react-youtube"; 
import movieTrailer from 'movie-trailer';
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  //Put all the variables outside useEffect that might change in as 2nd Argument so when fetchUrl changes we again run this effect
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts ={
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if(trailerUrl){
      setTrailerUrl('');
    }else{
      movieTrailer(movie?.name || "")
      .then(url => {
        //https://www.youtube.com/watch?v=HLnsCu4REcs : Below line gives entire string after ?
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v')); // Get value after = 
      }).catch(error => console.log(error));
    }
  }

  return (
    <div className="row">
      {/* Title */}
      <h2>{title}</h2>
      {/* Container : Movie Posters */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id} //Does not re render entire row if anything changes in that row : optimize for faster response
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          ></img>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;