import React, { Component, useState, useEffect } from 'react';
import './InfoPage.css';
import { getSelectedMovie } from './apiCalls';


const InfoPage = (selectedMovieId, showError) => {

  const [selectedMovie, setSelectedMovie] = useState({})
  // const [errorMessage, setErrorMessage] = useState('')
  const [genres, setGenres] = useState([])

useEffect(() => {
  getSelectedMovie(selectedMovieId)
    .then(data => {
      let genres = data.movie.genres.join(' | ');
      setGenres(genres)
      setSelectedMovie(data.movie)
    
    }, [])
    // .catch(error => {
    //   console.log(error);
    //   setErrorMessage({errorMessage: `${showError(error)} ${error.message}`})
    // })

}, [])

    return (
      <>
        {/* {errorMessage ? <h2>{errorMessage}</h2> : */}
          <article className='movie-info-container' style={{backgroundImage: `url(${selectedMovie.backdrop_path})`}}>
            <div className='info-mask'>
              <div className="rotating-box">
                <div className="rotating-box-inner">
                  <div className="rotating-box-front">
                    <img className='rotating-image'  src={selectedMovie.poster_path} alt='movie backdrop'></img> 
                  </div>
                  <div className="rotating-box-back">
                    <div className='info-container'>
                      <div className='title-wrapper'>
                        <h2 className='title'>{selectedMovie.title}</h2>
                      </div>
                      <div className='tagline-wrapper'>
                        <h3 className='tagline'>{selectedMovie.tagline}</h3>
                      </div>
                      <div className='information-wrapper'>
                        <p className="information">
                          <b>RELEASE DATE</b>: {selectedMovie.release_date} <br></br><br></br>
                          {genres} <br></br><br></br>
                          {Math.round(selectedMovie.average_rating * 10) / 10}/10 ⭐️ <br></br><br></br>
                          <b>RUNTIME</b>: {selectedMovie.runtime} MINUTES
                        </p>
                      </div>
                      <div className='overview-wrapper'>
                        <h3 className='overview'>{selectedMovie.overview}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        {/* } */}
      </>
    );
  };


export default InfoPage;