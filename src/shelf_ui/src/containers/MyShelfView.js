import React, { useEffect } from 'react';
// import React, { useEffect } from 'react';

import { MoviesContext } from '../context/MoviesContextProvider';

const MyShelfView = () => {
    const { my_movies, getMyMoviesRequest } = React.useContext(MoviesContext);

    const cardColor = (score) => {
        if(score >=7.5) return 'green';
        else if(score >=6.5) return 'orange';
        else return 'red';
    };

	// List user's NFTs
	useEffect(() => {
		getMyMoviesRequest();
        console.log(my_movies);
	}, []);

    return (
    <>
    {/* <section className="section"></section> */}
    <div className="section">
        
        <div className="catalog">
            <div className="container">
                <div className="row row--grid">

                    { 
                        my_movies.map(movie => (
                            <div className="col-6 col-sm-4 col-md-3 col-xl-2" key={movie.id}>
                                <div className="card">
                                    <div className="card__cover">
                                        <img src="img/covers/cover.jpg" alt="" />
                                        <a href="details.html" className="card__play">
                                            <i className="icon ion-ios-play"></i>
                                        </a>
                                        <span className={`card__rate card__rate--${cardColor(movie.imbd_score)}`}>{movie.imbd_score}</span>
                                    </div>
                                    <div className="card__content">v
                                        <h3 className="card__title"><a href="details.html">{movie.title}</a></h3>
                                        <span className="card__category">
                                            {movie.tags.map(tag => <a href={`/catalog?tag`} key={movie.id+tag}>{tag}</a>)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    

                </div>

                <div className="row">
                    <div className="col-12">
                        <button className="catalog__more" type="button">Load more</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>

    );
}
export default MyShelfView;