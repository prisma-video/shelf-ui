import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDfinityAuth } from "../../context/DfinityContextProvider";

const Header = () => {
    const auth = useDfinityAuth();
    const history = useHistory();

    const handleLogout = async () => {
        await auth.logOut();
        history.push("/");
    };

    return (
    <header className="header">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="header__content">
                        <Link to="/" className="header__logo">
                        <img src="/img/logo.svg" alt="" className="header__logo" />
                        </Link>
                        <ul className="header__nav">

                        {auth.isAuthenticated ?
                        <>
                        <li className="header__nav-item">
                            <Link to="/" className="header__nav-link">Discover</Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/" className="header__nav-link">Community</Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/myshelf" className="header__nav-link">My Shelf</Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/upload" className="header__nav-link">Upload Movie</Link>
                        </li>
                        </>
                        :
                        <>
                        <li className="header__nav-item">
                            <Link to="/pricing" className="header__nav-link">Pricing plan</Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/contact" className="header__nav-link">Contact</Link>
                        </li>
                        </>
                        }
                        </ul>
                        

                        <div className="header__auth">
                            <form action="#" className="header__search">
                                <input className="header__search-input" type="text" placeholder="Search..." />
                                <button className="header__search-button" type="button">
                                <i className="icon ion-ios-search"></i>
                                </button>
                                <button className="header__search-close" type="button">
                                <i className="icon ion-md-close"></i>
                                </button>
                            </form>

                            <button className="header__search-btn" type="button">
                                <i className="icon ion-ios-search"></i>
                            </button>
                            {auth.isAuthenticated ?
                            <>
                            <div className="sidebar__user-img">
                                <Link to="/profile">
                                <img src="/img/user.svg" alt="" />
                                </Link>
                            </div>
                            {/* <button className="sidebar__user-btn" type="button" onClick={handleLogout} >
                                <i className="icon ion-ios-log-out"></i>
                                <span>sign out</span>
                            </button> */}
                            <Link to="/singout" className="header__sign-in" onClick={handleLogout} >
                                <i className="icon ion-ios-log-out"></i>
                                <span>sign out</span>
                            </Link>
                            </>
                            :
                            <Link to="/singin" className="header__sign-in">
                                <i className="icon ion-ios-log-in"></i>
                                <span>sign in</span>
                            </Link>}
                        </div>
                            
                        <button className="header__btn" type="button">
                        <span></span>
                        <span></span>
                        <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
    );
}
export default Header;