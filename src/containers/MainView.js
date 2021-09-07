import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Main = () => (
<>
<Header />
<section class="section">
    <div class="content__head">
        <div class="container">
        <div class="row">
            <div class="col-12">
            {/* <h1 class="content__title">New items</h1> */}
            
            <ul class="nav nav-tabs content__tabs" id="content__tabs" role="tablist">
                <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">NEW RELEASES</a>
                </li>

                <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">MOVIES</a>
                </li>

                <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">TV SERIES</a>
                </li>

                <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">CARTOONS</a>
                </li>
            </ul>
            
            <div class="content__mobile-tabs" id="content__mobile-tabs">
                {/* <div class="content__mobile-tabs-btn dropdown-toggle" role="navigation" id="mobile-tabs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                <div class="content__mobile-tabs-btn dropdown-toggle" role="navigation" id="mobile-tabs" data-toggle="dropdown">
                <input type="button" value="New releases" />
                <span></span>
                </div>

                <div class="content__mobile-tabs-menu dropdown-menu" aria-labelledby="mobile-tabs">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item"><a class="nav-link active" id="1-tab" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">NEW RELEASES</a></li>

                    <li class="nav-item"><a class="nav-link" id="2-tab" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">MOVIES</a></li>

                    <li class="nav-item"><a class="nav-link" id="3-tab" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">TV SERIES</a></li>

                    <li class="nav-item"><a class="nav-link" id="4-tab" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">CARTOONS</a></li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container">
        <div class="tab-content">
        <div class="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
            <div class="row row--grid">
            
            <div class="col-6 col-sm-4 col-md-3 col-xl-2">
                <div class="card">
                <div class="card__cover">
                    <img src="img/covers/cover.jpg" alt="" />
                    <Link to={`/movie`} class="card__play">
                    <i class="icon ion-ios-play"></i>
                    </Link>
                    <span class="card__rate card__rate--green">8.4</span>
                </div>
                <div class="card__content">
                    <h3 class="card__title"><Link to={`/movie`}>I Dream in Another Language</Link></h3>
                    <span class="card__category">
                    <a href="#?html">Action</a>
                    <a href="#?html">Triler</a>
                    </span>
                </div>
                </div>
            </div>

            </div>
        </div>

        <div class="tab-pane fade" id="tab-2" role="tabpanel" aria-labelledby="2-tab">
            <div class="row row--grid">
            <div class="col-6 col-sm-4 col-md-3 col-xl-2">
                <div class="card">
                <div class="card__cover">
                    <img src="img/covers/cover.jpg" alt="" />
                    <a href="details.html" class="card__play">
                    <i class="icon ion-ios-play"></i>
                    </a>
                    <span class="card__rate card__rate--green">8.4</span>
                </div>
                <div class="card__content">
                    <h3 class="card__title"><a href="details.html">I Dream in Another Language</a></h3>
                    <span class="card__category">
                    <a href="#?html">Action</a>
                    <a href="#?html">Triler</a>
                    </span>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div class="tab-pane fade" id="tab-3" role="tabpanel" aria-labelledby="3-tab">
            <div class="row row--grid">
            <div class="col-6 col-sm-4 col-md-3 col-xl-2">
                <div class="card">
                <div class="card__cover">
                    <img src="img/covers/cover.jpg" alt="" />
                    <a href="details.html" class="card__play">
                    <i class="icon ion-ios-play"></i>
                    </a>
                    <span class="card__rate card__rate--green">8.4</span>
                </div>
                <div class="card__content">
                    <h3 class="card__title"><a href="details.html">I Dream in Another Language</a></h3>
                    <span class="card__category">
                    <a href="#?html">Action</a>
                    <a href="#?html">Triler</a>
                    </span>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div class="tab-pane fade" id="tab-4" role="tabpanel" aria-labelledby="4-tab">
            <div class="row row--grid">
            <div class="col-6 col-sm-4 col-md-3 col-xl-2">
                <div class="card">
                <div class="card__cover">
                    <img src="img/covers/cover.jpg" alt="" />
                    <a href="details.html" class="card__play">
                    <i class="icon ion-ios-play"></i>
                    </a>
                    <span class="card__rate card__rate--green">8.4</span>
                </div>
                <div class="card__content">
                    <h3 class="card__title"><a href="details.html">I Dream in Another Language</a></h3>
                    <span class="card__category">
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
<Footer />
</>
);

export default Main;