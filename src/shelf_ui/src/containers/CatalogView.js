import React, { useEffect } from 'react';
import { MoviesContext } from '../context/MoviesContextProvider';
import MovieFiltersBar from '../components/MovieFilters/MovieFiltersBar';
import MovieThumbnails from '../components/MovieList/MovieThumbnails';

const Main = ({ myshelf }) => {
    const { movies, my_movies, getMoviesRequest, getMyMoviesRequest } = React.useContext(MoviesContext);

	useEffect(() => {
        myshelf ? getMyMoviesRequest() : getMoviesRequest();
	}, []);

    return (
    <>
    {/* <section className="section"></section> */}
    <div className="section">
        <MovieFiltersBar />
        <MovieThumbnails movies={myshelf ? my_movies : movies} />
    </div>
    </>

    );
}
export default Main;