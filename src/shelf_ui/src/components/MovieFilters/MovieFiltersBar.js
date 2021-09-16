import React from 'react';

const MovieFiltersBar = () => (
<div className="filter filter--fixed">
  <div className="container">
      <div className="row">
          <div className="col-12">
              <div className="filter__content">
                  <div className="filter__items">
                      <div className="filter__item" id="filter__genre">
                          <span className="filter__item-label">GENRE:</span>

                          {/* <div className="filter__item-btn dropdown-toggle" role="navigation" id="filter-genre" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                          <div className="filter__item-btn dropdown-toggle" role="navigation" id="filter-genre" data-toggle="dropdown">
                              <input type="button" value="Action/Adventure" />
                              <span></span>
                          </div>

                          <ul className="filter__item-menu dropdown-menu scrollbar-dropdown" aria-labelledby="filter-genre">
                              <li>Action/Adventure</li>
                              <li>Animals</li>
                              <li>Animation</li>
                              <li>Biography</li>
                              <li>Comedy</li>
                              <li>Cooking</li>
                              <li>Dance</li>
                              <li>Documentary</li>
                              <li>Drama</li>
                              <li>Education</li>
                              <li>Entertainment</li>
                              <li>Family</li>
                              <li>Fantasy</li>
                              <li>History</li>
                              <li>Horror</li>
                              <li>Independent</li>
                              <li>International</li>
                              <li>Kids</li>
                              <li>Kids & Family</li>
                              <li>Medical</li>
                              <li>Military/War</li>
                              <li>Music</li>
                              <li>Musical</li>
                              <li>Mystery/Crime</li>
                              <li>Nature</li>
                              <li>Paranormal</li>
                              <li>Politics</li>
                              <li>Racing</li>
                              <li>Romance</li>
                              <li>Sci-Fi/Horror</li>
                              <li>Science</li>
                              <li>Science Fiction</li>
                              <li>Science/Nature</li>
                              <li>Spanish</li>
                              <li>Travel</li>
                              <li>Western</li>
                          </ul>
                      </div>
                      
                      <div className="filter__item" id="filter__quality">
                          <span className="filter__item-label">QUALITY:</span>

                          {/* <div className="filter__item-btn dropdown-toggle" role="navigation" id="filter-quality" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                          <div className="filter__item-btn dropdown-toggle" role="navigation" id="filter-quality" data-toggle="dropdown">
                              <input type="button" value="DVD" />
                              <span></span>
                          </div>

                          <ul className="filter__item-menu dropdown-menu scrollbar-dropdown" aria-labelledby="filter-quality">
                              <li>BlueRay</li>
                              <li>DVD</li>
                              <li>VHS</li>
                          </ul>
                      </div>
                      
                      <div className="filter__item" id="filter__rate">
                          <span className="filter__item-label">RATING:</span>

                          {/* <div className="filter__item-btn dropdown-toggle" role="button" id="filter-rate" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                          <div className="filter__item-btn dropdown-toggle" role="button" id="filter-rate" data-toggle="dropdown">
                              <div className="filter__range">
                                  <div id="filter__imbd-start"></div>
                                  <div id="filter__imbd-end"></div>
                              </div>
                              <span></span>
                          </div>

                          <div className="filter__item-menu filter__item-menu--range dropdown-menu" aria-labelledby="filter-rate">
                              <div id="filter__imbd"></div>
                          </div>
                      </div>
                      
                      <div className="filter__item" id="filter__year">
                          <span className="filter__item-label">RELEASE YEAR:</span>

                          {/* <div className="filter__item-btn dropdown-toggle" role="button" id="filter-year" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                          <div className="filter__item-btn dropdown-toggle" role="button" id="filter-year" data-toggle="dropdown">
                              <div className="filter__range">
                                  <div id="filter__years-start"></div>
                                  <div id="filter__years-end"></div>
                              </div>
                              <span></span>
                          </div>

                          <div className="filter__item-menu filter__item-menu--range dropdown-menu" aria-labelledby="filter-year">
                              <div id="filter__years"></div>
                          </div>
                      </div>
                      
                      <div className="filter__item" id="filter__year">
                          <span className="filter__item-label">ACTORS:</span>

                          {/* <div className="filter__item-btn dropdown-toggle" role="button" id="filter-year" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                          <div className="filter__item-btn dropdown-toggle" role="button" id="filter-year" data-toggle="dropdown">
                              <div className="filter__range">
                                  <div id="filter__years-start"></div>
                                  <div id="filter__years-end"></div>
                              </div>
                              <span></span>
                          </div>

                          <div className="filter__item-menu filter__item-menu--range dropdown-menu" aria-labelledby="filter-year">
                              <div id="filter__years"></div>
                          </div>
                      </div>

                      <div className="filter__item" id="filter__year">
                          <span className="filter__item-label">PRODUCER:</span>

                          {/* <div className="filter__item-btn dropdown-toggle" role="button" id="filter-year" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                          <div className="filter__item-btn dropdown-toggle" role="button" id="filter-year" data-toggle="dropdown">
                              <div className="filter__range">
                                  <div id="filter__years-start"></div>
                                  <div id="filter__years-end"></div>
                              </div>
                              <span></span>
                          </div>

                          <div className="filter__item-menu filter__item-menu--range dropdown-menu" aria-labelledby="filter-year">
                              <div id="filter__years"></div>
                          </div>
                      </div>
                  </div>
                  
                  <button className="filter__btn" type="button">apply filter</button>
              </div>
          </div>
      </div>
  </div>
</div>
);

export default MovieFiltersBar;