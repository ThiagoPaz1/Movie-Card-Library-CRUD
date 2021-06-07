import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';

import { MovieForm, Loading } from '../components';

class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      status: 'loading',
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    this.updateActualMovie();
  }

  handleSubmit = async (updatedMovie) => {
    const { updateMovie } = movieAPI;
    await updateMovie(updatedMovie);

    this.setState({
      shouldRedirect: true,
    });
  }

  updateActualMovie = async () => {
    const { match: { params: { id } } } = this.props;
    const { getMovie } = movieAPI;

    const response = await getMovie(id);

    this.setState({
      movie: response,
      status: '',
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;

    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default EditMovie;
