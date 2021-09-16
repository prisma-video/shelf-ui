import React from 'react';
import { Link } from 'react-router-dom';
import { useDfinityAuth } from "../context/DfinityContextProvider";


const MainView = () => {
    const auth = useDfinityAuth();
    
    if( !auth.isAuthenticated ) {
    return (
    <>
    <section className="section">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h2 className="section__title section__title--mb"><br />The New Best Way to Distribute Your Movies</h2>
				</div>
				<div className="col-12">
					<p className="section__text">It is a long <b>established</b> fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.</p>

					<p className="section__text">'Content here, content here', making it look like <a href="#test">readable</a> English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="feature">
						<i className="icon ion-ios-tv feature__icon"></i>
						<h3 className="feature__title">Ultra HD</h3>
						<p className="feature__text">If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="feature">
						<i className="icon ion-ios-film feature__icon"></i>
						<h3 className="feature__title">Film</h3>
						<p className="feature__text">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first.</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="feature">
						<i className="icon ion-ios-trophy feature__icon"></i>
						<h3 className="feature__title">Awards</h3>
						<p className="feature__text">It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining.</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="feature">
						<i className="icon ion-ios-notifications feature__icon"></i>
						<h3 className="feature__title">Notifications</h3>
						<p className="feature__text">Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="feature">
						<i className="icon ion-ios-rocket feature__icon"></i>
						<h3 className="feature__title">Rocket</h3>
						<p className="feature__text">It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="feature">
						<i className="icon ion-ios-globe feature__icon"></i>
						<h3 className="feature__title">Multi Language Subtitles </h3>
						<p className="feature__text">Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section className="section section--border">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h2 className="section__title section__title--mb0">How it works?</h2>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="how">
						<span className="how__number">01</span>
						<h3 className="how__title">Create an account</h3>
						<p className="how__text">It has never been an issue to find an old movie or TV show on the internet. However, this is not the case with the new releases.</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="how">
						<span className="how__number">02</span>
						<h3 className="how__title">Choose your Plan</h3>
						<p className="how__text">It has never been an issue to find an old movie or TV show on the internet. However, this is not the case with the new releases.</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-4">
					<div className="how">
						<span className="how__number">03</span>
						<h3 className="how__title">Enjoy MovieGo</h3>
						<p className="how__text">It has never been an issue to find an old movie or TV show on the internet. However, this is not the case with the new releases.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section className="section section--border">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h2 className="section__title section__title--mb">Our Partners</h2>
				</div>
				<div className="col-12">
					<p className="section__text">It is a long <b>established</b> fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.</p>
				</div>
				<div className="col-6 col-sm-4 col-md-3 col-lg-2">
					<a href="#test" className="partner">
						<img src="img/partners/themeforest-light-background.png" alt="" className="partner__img" />
					</a>
				</div>
				<div className="col-6 col-sm-4 col-md-3 col-lg-2">
					<a href="#test" className="partner">
						<img src="img/partners/audiojungle-light-background.png" alt="" className="partner__img" />
					</a>
				</div>
				<div className="col-6 col-sm-4 col-md-3 col-lg-2">
					<a href="#test" className="partner">
						<img src="img/partners/codecanyon-light-background.png" alt="" className="partner__img" />
					</a>
				</div>
				<div className="col-6 col-sm-4 col-md-3 col-lg-2">
					<a href="#test" className="partner">
						<img src="img/partners/photodune-light-background.png" alt="" className="partner__img" />
					</a>
				</div>
				<div className="col-6 col-sm-4 col-md-3 col-lg-2">
					<a href="#test" className="partner">
						<img src="img/partners/activeden-light-background.png" alt="" className="partner__img" />
					</a>
				</div>
				<div className="col-6 col-sm-4 col-md-3 col-lg-2">
					<a href="#test" className="partner">
						<img src="img/partners/3docean-light-background.png" alt="" className="partner__img" />
					</a>
				</div>
			</div>
		</div>
	</section>
    </>
    );
    }
    else {

        return (
        <section className="section">
            <div className="content__head">
                <div className="container">
                <div className="row">
                    <div className="col-12">
                    {/* <h1 className="content__title">New items</h1> */}
                    
                    <ul className="nav nav-tabs content__tabs" id="content__tabs" role="tablist">
                        <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">NEW RELEASES</a>
                        </li>

                        <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">MOVIES</a>
                        </li>

                        <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">TV SERIES</a>
                        </li>

                        <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">CARTOONS</a>
                        </li>
                    </ul>
                    
                    <div className="content__mobile-tabs" id="content__mobile-tabs">
                        {/* <div className="content__mobile-tabs-btn dropdown-toggle" role="navigation" id="mobile-tabs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                        <div className="content__mobile-tabs-btn dropdown-toggle" role="navigation" id="mobile-tabs" data-toggle="dropdown">
                        <input type="button" value="New releases" />
                        <span></span>
                        </div>

                        <div className="content__mobile-tabs-menu dropdown-menu" aria-labelledby="mobile-tabs">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item"><a className="nav-link active" id="1-tab" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">NEW RELEASES</a></li>

                            <li className="nav-item"><a className="nav-link" id="2-tab" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">MOVIES</a></li>

                            <li className="nav-item"><a className="nav-link" id="3-tab" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">TV SERIES</a></li>

                            <li className="nav-item"><a className="nav-link" id="4-tab" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">CARTOONS</a></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="container">
                <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
                    <div className="row row--grid">
                    
                    <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                        <div className="card">
                        <div className="card__cover">
                            <img src="img/covers/cover.jpg" alt="" />
                            <Link to={`/movie`} className="card__play">
                            <i className="icon ion-ios-play"></i>
                            </Link>
                            <span className="card__rate card__rate--green">8.4</span>
                        </div>
                        <div className="card__content">
                            <h3 className="card__title"><Link to={`/movie`}>I Dream in Another Language</Link></h3>
                            <span className="card__category">
                            <a href="#?html">Action</a>
                            <a href="#?html">Triler</a>
                            </span>
                        </div>
                        </div>
                    </div>

                    </div>
                </div>

                <div className="tab-pane fade" id="tab-2" role="tabpanel" aria-labelledby="2-tab">
                    <div className="row row--grid">
                    <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                        <div className="card">
                        <div className="card__cover">
                            <img src="img/covers/cover.jpg" alt="" />
                            <a href="details.html" className="card__play">
                            <i className="icon ion-ios-play"></i>
                            </a>
                            <span className="card__rate card__rate--green">8.4</span>
                        </div>
                        <div className="card__content">
                            <h3 className="card__title"><a href="details.html">I Dream in Another Language</a></h3>
                            <span className="card__category">
                            <a href="#?html">Action</a>
                            <a href="#?html">Triler</a>
                            </span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="tab-3" role="tabpanel" aria-labelledby="3-tab">
                    <div className="row row--grid">
                    <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                        <div className="card">
                        <div className="card__cover">
                            <img src="img/covers/cover.jpg" alt="" />
                            <a href="details.html" className="card__play">
                            <i className="icon ion-ios-play"></i>
                            </a>
                            <span className="card__rate card__rate--green">8.4</span>
                        </div>
                        <div className="card__content">
                            <h3 className="card__title"><a href="details.html">I Dream in Another Language</a></h3>
                            <span className="card__category">
                            <a href="#?html">Action</a>
                            <a href="#?html">Triler</a>
                            </span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="tab-4" role="tabpanel" aria-labelledby="4-tab">
                    <div className="row row--grid">
                    <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                        <div className="card">
                        <div className="card__cover">
                            <img src="img/covers/cover.jpg" alt="" />
                            <a href="details.html" className="card__play">
                            <i className="icon ion-ios-play"></i>
                            </a>
                            <span className="card__rate card__rate--green">8.4</span>
                        </div>
                        <div className="card__content">
                            <h3 className="card__title"><a href="details.html">I Dream in Another Language</a></h3>
                            <span className="card__category">
                            <a href="#?html">Action</a>
                            <a href="#?html">Triler</a>
                            </span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        );
    };
};

export default MainView;