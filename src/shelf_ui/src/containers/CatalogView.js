import React from 'react';
// import { Link } from 'react-router-dom';

import { MoviesContext } from '../context/MoviesContextProvider';
import MovieFiltersBar from '../components/MovieFilters/MovieFiltersBar';
import MovieThumbnails from '../components/MovieList/MovieThumbnails';

const Main = ({myshelf}) => {
    const { movies, my_movies, getMoviesRequest, getMyMoviesRequest } = React.useContext(MoviesContext);

	// List user's NFTs
	useEffect(() => {
        myshelf ? getMyMoviesRequest() : getMoviesRequest();
        console.log("catalog: ", myshelf, myshelf ? my_movies : movies);
	}, []);

    return (
    <>
    {/* <section className="section"></section> */}
    <div className="section">
        <MovieFiltersBar />
        <MovieThumbnails />
    </div>
    </>

    );
}
export default Main;