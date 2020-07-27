import React, { Component } from "react";
import "./index.css";

export default class MovieList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: [],
      search: '',
      error: false
    }

  }
  onSearchChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }
  onSearchButton = () => {
    fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${this.state.search}`).then(response => response.json()).then(res => {

      if (res.data.length > 0) {
        this.setState({
          movies: res.data,
          error: false
        })
      } else {
        this.setState({
          error: true
        })
      }
    })

  }

  render() {
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input" onChange={this.onSearchChange} />
          <button className="" data-testid="submit-button" onClick={this.onSearchButton}>Search</button>
        </section>
        {this.state.error ? <div className="mt-50 slide-up-fade-in" data-testid="no-result"> No Results Found</div> :
          <ul className="mt-50 styled" data-testid="movieList">
            {this.state.movies && this.state.movies.map(movie => (<li className="slide-up-fade-in py-10" key={movie.imdbID}>{movie.Title}</li>))}

          </ul>}



      </div>
    );
  }
}
