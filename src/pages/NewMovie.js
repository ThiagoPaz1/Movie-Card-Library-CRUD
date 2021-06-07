import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';

import MovieForm from '../components/MovieForm';

class NewMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRedirect: false,
    };
  }

  handleSubmit = async (newMovie) => {
    const { createMovie } = movieAPI;
    await createMovie(newMovie);

    this.setState({
      shouldRedirect: true,
    });
  }

  render() {
    const { shouldRedirect } = this.state;

    if (shouldRedirect) { return <Redirect to="/" />; }

    return (
      <div data-testid="new-movie">
        <MovieForm onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}
export default NewMovie;
