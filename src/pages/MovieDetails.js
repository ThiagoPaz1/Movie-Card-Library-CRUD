import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.reqMovieID();
  }

  reqMovieID = async () => {
    const { match: { params: { id } } } = this.props;
    const { getMovie } = movieAPI;

    const response = await getMovie(id);

    this.setState({
      movie: response,
      loading: false,
    });
  }

  deleteActualMovie = async () => {
    const { deleteMovie } = movieAPI;
    const { movie: { id } } = this.state;

    deleteMovie(id);
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    const { movie, loading } = this.state;
    const { id, title, storyline, imagePath, genre, rating, subtitle } = movie;

    return (
      <div>
        {loading ? <Loading /> : (
          <div data-testid="movie-details">
            <img alt="Movie Cover" src={ `../${imagePath}` } />
            <p>{`Title: ${title}`}</p>
            <p>{ `Subtitle: ${subtitle}` }</p>
            <p>{ `Storyline: ${storyline}` }</p>
            <p>{ `Genre: ${genre}` }</p>
            <p>{ `Rating: ${rating}` }</p>

            <div className="movie-details-buttons">
              <button type="button">
                <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
              </button>

              <button type="button" onClick={ () => this.deleteActualMovie() }>
                <Link to="/">DELETAR</Link>
              </button>

              <button type="button">
                <Link to="/">VOLTAR</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default MovieDetails;
