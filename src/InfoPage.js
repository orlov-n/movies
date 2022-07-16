import React, { Component } from 'react';
import './InfoPage.css';
import { getSelectedMovie } from './apiCalls';

let genres;

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: {},
      errorMessage: '',
    };
  };

  componentDidMount = () => {
    getSelectedMovie(this.props.selectedMovieId)
    .then(data => {
      genres = data.movie.genres.join(' | ');
      this.setState({selectedMovie: data.movie}) 
    })
    .catch(error => {
      console.log(error);
      this.setState({errorMessage: this.props.throwError(error)})
    })
  };

  throwError = (response) => {
    if (!response.ok) {
      throw new Error("Something went wrong, please try again!");
    } else {
      return response.json();
    };
  };

  render() {
    return (
      <>
        {this.state.errorMessage ? <h2>{this.state.errorMessage}</h2> :
          <article className='movie-info-container' style={{backgroundImage: `url(${this.state.selectedMovie.backdrop_path})`}}>
            <div className='info-mask'>
              <div className="rotating-box">
                <div className="rotating-box-inner">
                  <div className="rotating-box-front">
                    <img className='rotating-image'  src={this.state.selectedMovie.poster_path} alt='movie backdrop'></img> 
                  </div>
                  <div className="rotating-box-back">
                    <h2 className='title'>{this.state.selectedMovie.title}</h2>
                    <h3 className='tagline'>{this.state.selectedMovie.tagline}</h3>
                    <p className="information">
                      <b>RELEASE DATE</b>: {this.state.selectedMovie.release_date} <br></br><br></br>
                      {genres} <br></br><br></br>
                      {Math.round(this.state.selectedMovie.average_rating * 10) / 10}/10 ⭐️ <br></br><br></br>
                      <b>RUNTIME</b>: {this.state.selectedMovie.runtime} MINUTES
                    </p>
                    <h3 className='overview'>{this.state.selectedMovie.overview}</h3>
                  </div>
                </div>
              </div>
            </div>
          </article>
        }
      </>
    );
  };
};

export default InfoPage;