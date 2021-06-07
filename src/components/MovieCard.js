import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../css/MovieCard.css';

class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    const { title, imagePath, storyline, id } = movie;

    return (
      <div data-testid="movie-card" className="card">
        <h3>{ title }</h3>
        <img src={ imagePath } alt={ title } className=".movie-card-image" />
        <p>{ storyline }</p>
        <button type="button">
          <Link to={ `/movies/${id}` }>VER DETALHES</Link>
        </button>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    imagePath: PropTypes.string,
    storyline: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default MovieCard;
