import React, { useEffect } from 'react';
import { useDfinityAuth } from "../context/DfinityContextProvider"
import { MoviesContext } from '../context/MoviesContextProvider';
import MovieFiltersBar from '../components/MovieFilters/MovieFiltersBar';
import MovieThumbnails from '../components/MovieList/MovieThumbnails';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import PricingView from '../components/PricingBars/PricingView';

const Main = ({ mode }) => {
    const { movies, my_movies, getMoviesRequest, getMyMoviesRequest } = React.useContext(MoviesContext);
    const auth = useDfinityAuth();

	useEffect(() => {
        if(mode=="myshelf") {getMyMoviesRequest()}
        else if (mode=="catalog") {getMoviesRequest()}
        // console.log(auth.identity.getPrincipal().toString())
	}, []);

    
    if( !auth.isAuthenticated && mode !== "pricing" ) mode = "howitworks";
    
    let targetPage;
    switch(mode) {
        case "howitworks":
            targetPage = <HowItWorks />;
            break;
        case "pricing":
            targetPage = <PricingView />;
            break;
        default:
            targetPage = (<>
            <MovieFiltersBar />
            <MovieThumbnails movies={mode=="myshelf" ? my_movies : movies} />
            </>)
    }

    return (
    <>
    {/* <section className="section"></section> */}
    <div className="section">
        {targetPage}
    </div>
    </>

    );
}
export default Main;