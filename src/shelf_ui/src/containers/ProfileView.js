import React, { useEffect, useRef }  from 'react';
import { useDfinityAuth } from "../context/DfinityContextProvider"

import InputField from "../components/FormItems/InputField";

const ProfileView = () => {
    const auth = useDfinityAuth();
    const inputRef = useRef({});

	useEffect(() => {
        auth.getUserDetails();
	}, []); //userProfile

    const handleProfileUpdate = async () => {
        // var tmpValues = {};
        var tmpValues = auth.userProfile;
        // tmpValues.doubleOptIn = true;
        tmpValues.communities = ["test"];
        Object.keys(inputRef.current).forEach(x => {tmpValues[x] = inputRef.current[x].value || ''});
        console.log("FINAL", tmpValues);
        await auth.updateUserDetails(tmpValues);
    }

    console.log(auth.userProfile);
    if(!auth.userProfile) return "loading..."

    return (
<>
<br /><br /><br />
<div className="content content--profile">
    <div className="profile">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="profile__content">
                        <div className="profile__user">
                            <div className="profile__avatar">
                                <img src="img/user.svg" alt="" />
                            </div>
                            <div className="profile__meta">
                                <h3>John Doe</h3>
                                <span>HOTFLIX ID: 78123</span>
                            </div>
                        </div>

                        <ul className="nav nav-tabs content__tabs content__tabs--profile" id="content__tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Profile</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">Settings</a>
                            </li>
                        </ul>
                        
                        <div className="content__mobile-tabs content__mobile-tabs--profile" id="content__mobile-tabs">
                            <div className="content__mobile-tabs-btn dropdown-toggle" role="navigation" id="mobile-tabs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <input type="button" value="Profile" />
                                <span></span>
                            </div>

                            <div className="content__mobile-tabs-menu dropdown-menu" aria-labelledby="mobile-tabs">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item"><a className="nav-link active" id="1-tab" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Profile</a></li>

                                    <li className="nav-item"><a className="nav-link" id="2-tab" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Subscription</a></li>

                                    <li className="nav-item"><a className="nav-link" id="3-tab" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">Settings</a></li>
                                </ul>
                            </div>
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
                    <div className="col-12 col-sm-6 col-xl-3">
                        <div className="stats">
                            <span>Premium plan</span>
                            <p>$34.99 / month</p>
                            <i className="icon ion-ios-card"></i>
                        </div>
                    </div>
                    
                    <div className="col-12 col-sm-6 col-xl-3">
                        <div className="stats">
                            <span>Films watched</span>
                            <p><a href="#">1 678</a></p>
                            <i className="icon ion-ios-film"></i>
                        </div>
                    </div>
                    
                    <div className="col-12 col-sm-6 col-xl-3">
                        <div className="stats">
                            <span>Your comments</span>
                            <p><a href="#">2 573</a></p>
                            <i className="icon ion-ios-chatbubbles"></i>
                        </div>
                    </div>
                    
                    <div className="col-12 col-sm-6 col-xl-3">
                        <div className="stats">
                            <span>Your reviews</span>
                            <p><a href="#">1 021</a></p>
                            <i className="icon ion-ios-star-half"></i>
                        </div>
                    </div>
                    
                    <div className="col-12 col-xl-6">
                        <div className="dashbox">
                            <div className="dashbox__title">
                                <h3><i className="icon ion-ios-film"></i> Movies for you</h3>

                                <div className="dashbox__wrap">
                                    <a className="dashbox__refresh" href="#"><i className="icon ion-ios-refresh"></i></a>
                                    <a className="dashbox__more" href="catalog.html">View All</a>
                                </div>
                            </div>

                            <div className="dashbox__table-wrap">
                                <table className="main__table main__table--dash">
                                    <thead>
                                        <tr>
                                            <th>TITLE</th>
                                            <th>CATEGORY</th>
                                            <th>RATING</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="main__table-text"><a href="#">I Dream in Another Language</a></div>
                                            </td>
                                            <td>
                                                <div className="main__table-text">Movie</div>
                                            </td>
                                            <td>
                                                <div className="main__table-text main__table-text--rate"><i className="icon ion-ios-star"></i> 9.2</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="main__table-text"><a href="#">Benched</a></div>
                                            </td>
                                            <td>
                                                <div className="main__table-text">Movie</div>
                                            </td>
                                            <td>
                                                <div className="main__table-text main__table-text--rate"><i className="icon ion-ios-star"></i> 9.1</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="main__table-text"><a href="#">Whitney</a></div>
                                            </td>
                                            <td>
                                                <div className="main__table-text">TV Series</div>
                                            </td>
                                            <td>
                                                <div className="main__table-text main__table-text--rate"><i className="icon ion-ios-star"></i> 9.0</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="main__table-text"><a href="#">Blindspotting 2</a></div>
                                            </td>
                                            <td>
                                                <div className="main__table-text">TV Series</div>
                                            </td>
                                            <td>
                                                <div className="main__table-text main__table-text--rate"><i className="icon ion-ios-star"></i> 8.9</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="main__table-text"><a href="#">Blindspotting</a></div>
                                            </td>
                                            <td>
                                                <div className="main__table-text">TV Series</div>
                                            </td>
                                            <td>
                                                <div className="main__table-text main__table-text--rate"><i className="icon ion-ios-star"></i> 8.9</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-12 col-xl-6">
                        <div className="dashbox">
                            <div className="dashbox__title">
                                <h3><i className="icon ion-ios-star-half"></i> Latest reviews</h3>

                                <div className="dashbox__wrap">
                                    <a className="dashbox__refresh" href="#"><i className="icon ion-ios-refresh"></i></a>
                                    <a className="dashbox__more" href="#">View All</a>
                                </div>
                            </div>

                            <div className="dashbox__table-wrap">
                                <table className="main__table main__table--dash">
                                    <thead>
                                        <tr>
                                            <th>ITEM</th>
                                            <th>AUTHOR</th>
                                            <th>RATING</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="main__table-text"><a href="#">I Dream in Another Language</a></div>
                                            </td>
                                            <td>
                                                <div className="main__table-text">John Doe</div>
                                            </td>
                                            <td>
                                                <div className="main__table-text main__table-text--rate"><i className="icon ion-ios-star"></i> 7.2</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="main__table-text"><a href="#">Benched</a></div>
                                            </td>
                                            <td>
                                                <div className="main__table-text">John Doe</div>
                                            </td>
                                            <td>
                                                <div className="main__table-text main__table-text--rate"><i className="icon ion-ios-star"></i> 6.3</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="main__table-text"><a href="#">Whitney</a></div>
                                            </td>
                                            <td>
                                                <div className="main__table-text">John Doe</div>
                                            </td>
                                            <td>
                                                <div className="main__table-text main__table-text--rate"><i className="icon ion-ios-star"></i> 8.4</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="main__table-text"><a href="#">Blindspotting</a></div>
                                            </td>
                                            <td>
                                                <div className="main__table-text">John Doe</div>
                                            </td>
                                            <td>
                                                <div className="main__table-text main__table-text--rate"><i className="icon ion-ios-star"></i> 9.0</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="main__table-text"><a href="#">I Dream in Another Language</a></div>
                                            </td>
                                            <td>
                                                <div className="main__table-text">John Doe</div>
                                            </td>
                                            <td>
                                                <div className="main__table-text main__table-text--rate"><i className="icon ion-ios-star"></i> 7.7</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tab-pane fade" id="tab-3" role="tabpanel" aria-labelledby="3-tab">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <form action="#" className="form form--profile">
                            <div className="row row--form">
                                <div className="col-12">
                                    <h4 className="form__title">Profile details</h4>
                                </div>
                                {
                                    [{label:"Username", var: "userName"}, {label:"Email", var: "emailAddress"},
                                        {label:"First Name", var: "firstName"}, {label:"Last Name", var: "lastName"}, 
                                    ].map(x => <InputField label={x.label}
                                                    defaultValue={auth.userProfile[x.label]}
                                                    ref={el => {inputRef.current[x.var] = el}}
                                                    key={x.var} />)
                                }
                                <div className="col-12">
                                    <button className="form__btn" type="button" onClick={handleProfileUpdate}>Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                
                </div>
            </div>
        </div>
    </div>
</div>
</>
    );
};

export default ProfileView;