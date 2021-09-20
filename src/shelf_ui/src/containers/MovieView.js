import React, { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { MoviesContext } from '../context/MoviesContextProvider';
import MovieCard from '../components/MovieList/MovieCard';

import { isOwnedOrReservable, makeOffer, executeSalesOrder, requestReservation, getCaller } from "../utils/index";

import Plyr from 'plyr-react'
import './plyr.css'

const MovieView = () => {
	const { movies, movie_data, getMovieByIdRequest } = useContext(MoviesContext);
	let { id } = useParams();
	const defValWatchable = movie_data.my_nfts != undefined && movie_data.my_nfts.length >0 ? true : false;
	console.log( movie_data.my_nfts, defValWatchable);
	const [isWatchable, setIsWatchable] = useState(defValWatchable);

	useEffect(() => {
        getMovieByIdRequest(id);
	}, []);

	const acquireNFT = async () => {
		console.log((await getCaller()));
		if (await isOwnedOrReservable(movie_data.nfts[0][0])) {
			const orderId = await makeOffer({nft: movie_data.nfts[0][0], purchasePrice: 100});
			const executionOutcome = await executeSalesOrder(orderId);
			console.log(movie_data.nfts[0][0], orderId, executionOutcome);
			await requestReservation(movie_data.nfts[0][0]);
			setIsWatchable(true);
		} else {
			console.log("not reservable");
		}
	};

	const sourceVideo = {
		type: "video",
		source: [
			// {src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"},
			{src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4", type:"video/mp4", size:"576"},
			{src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4", type:"video/mp4", size:"720"},
			{src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4", type:"video/mp4", size:"1080"}
		],
		poster:"https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
		tracks: [{kind:"captions", label:"English", srcLang:"en", src:"https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt", default: true}]
	};


	return (
	!movie_data.directors ?
	"Loading..."
	:
    <>
	<section className="section section--details">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h1 className="section__title section__title--mb">{movie_data.title}</h1>
				</div>
				<div className="col-12 col-xl-6">
					<div className="card card--details">
						<div className="row">
							<div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-5">
								<div className="card__cover">
									<img src={`/DB/${movie_data.title.replace(':', '-')}.jpeg`} alt="" />
									<span className="card__rate card__rate--green">{movie_data.average_score}</span>
								</div>
								<a href="http://www.youtube.com/watch?v=0O2aH4XLbto" className="card__trailer"><i className="icon ion-ios-play-circle"></i> Watch trailer</a>
							</div>

							<div className="col-12 col-md-8 col-lg-9 col-xl-7">
								<div className="card__content">
									<ul className="card__meta">
										<li><span>Director:</span>{movie_data.directors.map(x => <a href="#?html" key={x}>{x}</a>)}</li>
										<li><span>Cast:</span>{movie_data.cast.map(x => <a href="#?html" key={x}>{x}</a>)}</li>
										<li><span>Genre:</span>{movie_data.tags.map(x => <a href="#?html" key={x}>{x}</a>)}</li>
										<li><span>Release year:</span> {movie_data.release_date.substring(0, 4)}</li>
										<li><span>Running time:</span> {movie_data.duration}</li>
										<li><span>Country:</span> <a href="#?html">USA</a></li>
									</ul>
									<div className="card__description">{movie_data.overview}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div className="col-12 col-xl-6">
					{
					!isWatchable ?
					<>
					<img src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg" onClick={acquireNFT} id="player" className="plyr" />
					<span style={{color:"white"}}>You do not own a copy but there are <b style={{color:"darkred"}}>{movie_data.nfts.length} NFTs</b> available.
					<a onClick={acquireNFT} className="header__sign-in"><i className="icon ion-ios-log-in"></i><span>Aquire NFT</span></a><button></button>
					</span>
					</>
					:
					// <video controls crossOrigin="true" playsInline data-poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg" id="player">
					// 	<source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" size="576" />
					// 	<source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" type="video/mp4" size="720" />
					// 	<source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4" type="video/mp4" size="1080" />
					// 	<track kind="captions" label="English" srcLang="en" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt" default />
					// </video>
					<Plyr source={sourceVideo}/>
					}
				</div>
			</div>
		</div>
	</section>
	
	<section className="content">
		<div className="content__head">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h2 className="content__title">Discover</h2>
						
						<ul className="nav nav-tabs content__tabs" id="content__tabs" role="tablist">
							<li className="nav-item">
								<a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Comments</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Reviews</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">Photos</a>
							</li>
						</ul>
						
						<div className="content__mobile-tabs" id="content__mobile-tabs">
							{/* <div className="content__mobile-tabs-btn dropdown-toggle" role="navigation" id="mobile-tabs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
							<div className="content__mobile-tabs-btn dropdown-toggle" role="navigation" id="mobile-tabs" data-toggle="dropdown">
								<input type="button" value="Comments" />
								<span></span>
							</div>

							<div className="content__mobile-tabs-menu dropdown-menu" aria-labelledby="mobile-tabs">
								<ul className="nav nav-tabs" role="tablist">
									<li className="nav-item"><a className="nav-link active" id="1-tab" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Comments</a></li>

									<li className="nav-item"><a className="nav-link" id="2-tab" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Reviews</a></li>

									<li className="nav-item"><a className="nav-link" id="3-tab" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">Photos</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="container">
			<div className="row">
				<div className="col-12 col-lg-8 col-xl-8">
					<div className="tab-content">
						<div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
							<div className="row">
								<div className="col-12">
									<div className="comments">
										<ul className="comments__list">
											<li className="comments__item">
												<div className="comments__autor">
													<img className="comments__avatar" src="/img/user.svg" alt="" />
													<span className="comments__name">John Doe</span>
													<span className="comments__time">30.08.2018, 17:53</span>
												</div>
												<p className="comments__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text.</p>
												<div className="comments__actions">
													<div className="comments__rate">
														<button type="button"><i className="icon ion-md-thumbs-up"></i>12</button>

														<button type="button">7<i className="icon ion-md-thumbs-down"></i></button>
													</div>

													<button type="button"><i className="icon ion-ios-share-alt"></i>Reply</button>
													<button type="button"><i className="icon ion-ios-quote"></i>Quote</button>
												</div>
											</li>

											<li className="comments__item comments__item--answer">
												<div className="comments__autor">
													<img className="comments__avatar" src="/img/user.svg" alt="" />
													<span className="comments__name">John Doe</span>
													<span className="comments__time">24.08.2018, 16:41</span>
												</div>
												<p className="comments__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
												<div className="comments__actions">
													<div className="comments__rate">
														<button type="button"><i className="icon ion-md-thumbs-up"></i>8</button>

														<button type="button">3<i className="icon ion-md-thumbs-down"></i></button>
													</div>

													<button type="button"><i className="icon ion-ios-share-alt"></i>Reply</button>
													<button type="button"><i className="icon ion-ios-quote"></i>Quote</button>
												</div>
											</li>

										</ul>

										<form action="#" className="form">
											<textarea id="text" name="text" className="form__textarea" placeholder="Add comment"></textarea>
											<button type="button" className="form__btn">Send</button>
										</form>
									</div>
								</div>
							</div>
						</div>

						<div className="tab-pane fade" id="tab-2" role="tabpanel" aria-labelledby="2-tab">
							<div className="row">
								<div className="col-12">
									<div className="reviews">
										<ul className="reviews__list">
											<li className="reviews__item">
												<div className="reviews__autor">
													<img className="reviews__avatar" src="/img/user.svg" alt="" />
													<span className="reviews__name">Best Marvel movie in my opinion</span>
													<span className="reviews__time">24.08.2018, 17:53 by John Doe</span>

													<span className="reviews__rating reviews__rating--green">8.4</span>
												</div>
												<p className="reviews__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which donlook even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text.</p>
											</li>
										</ul>

										<form action="#" className="form">
											<input type="text" className="form__input" placeholder="Title" />
											<textarea className="form__textarea" placeholder="Review"></textarea>
											<div className="form__slider">
												<div className="form__slider-rating" id="slider__rating"></div>
												<div className="form__slider-value" id="form__slider-value"></div>
											</div>
											<button type="button" className="form__btn">Send</button>
										</form>
									</div>
								</div>
							</div>
						</div>

						<div className="tab-pane fade" id="tab-3" role="tabpanel" aria-labelledby="3-tab">
							<div className="gallery" itemScope>
								<div className="row row--grid">
								{
									[1,2,3,4,5,6].map(n => 
									<figure key={n} className="col-12 col-sm-6 col-xl-4" itemProp="associatedMedia" itemScope>
										<a href="/img/gallery/project-1.jpg" itemProp="contentUrl" data-size="1920x1280">
											<img src="/img/gallery/project-1.jpg" itemProp="thumbnail" alt="test" />
										</a>
										<figcaption itemProp="caption description">Some image caption {n}</figcaption>
									</figure>)
								}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-12 col-lg-4 col-xl-4">
					<div className="row row--grid">
						<div className="col-12">
							<h2 className="section__title section__title--sidebar">You may also like...</h2>
						</div>
						{
						movies && movies.slice(0, 6).map(movie => 
							<div className="col-6 col-sm-4 col-lg-6" key={movie.id}>
								<MovieCard props={movie} key={movie.id}/>
							</div>
						)
						}
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
	);
};
export default MovieView;