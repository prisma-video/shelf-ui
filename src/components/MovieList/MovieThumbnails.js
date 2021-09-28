import React from 'react';
import MovieCard from './MovieCard';

const MovieThumbnails = ({movies}) => (
<div className="catalog">
    <div className="container">
        <div className="row row--grid">
            {
                movies && movies.map(movie => 
                    <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={movie.legacy_id}>
                        <MovieCard props={movie} key={movie.legacy_id}/>
                    </div>
                )
            }
        </div>

        <div className="row">
            <div className="col-12">
                <button className="catalog__more" type="button">Load more</button>
            </div>
        </div>
    </div>
</div>
);

export default MovieThumbnails;