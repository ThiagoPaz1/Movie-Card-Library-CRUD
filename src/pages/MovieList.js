import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import '../css/MovieList.css';

import { MovieCard, Loading } from '../components';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.reqMovie();
  }

  reqMovie = async () => {
    const { getMovies } = movieAPI;
    const response = await getMovies();

    this.setState({
      movies: response,
      loading: false,
    });
  }

  render() {
    const { movies, loading } = this.state;

    // Render Loading here if the request is still happening

    return (
      <div data-testid="movie-list" className="movie-list">
        {loading ? <Loading />
          : movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        <button type="button">
          <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        </button>
      </div>
    );
  }
}

export default MovieList;
