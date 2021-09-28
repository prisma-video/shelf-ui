import React from 'react';
import { Link } from 'react-router-dom';

const cardColor = (score) => {
    if(score >=7.5) return 'green';
    else if(score >=6) return 'yellow';
    else return 'red';
};

const MovieCard = ({props: {legacy_id, title, tags, vote_average}}) => (
    <div className="card">
        <div className="card__cover">
            <img src={`/DB/${title.replace(':', '-')}.jpeg`} alt="" />
            <Link to={`/movie/${legacy_id}`} className="card__play">
                <i className="icon ion-ios-play"></i>
            </Link>
            <span className={`card__rate card__rate--${cardColor(vote_average)}`}>{Number((vote_average).toFixed(1))}</span>
        </div>
        <div className="card__content">
            <h3 className="card__title"><Link to={`/movie/${legacy_id}`}>{title}</Link></h3>
            <span className="card__category">
                {tags && tags.map(tag => <a href={`/catalog?tag`} key={tag.name}>{tag.name}</a>)}
            </span>
        </div>
    </div>
);

export default MovieCard;