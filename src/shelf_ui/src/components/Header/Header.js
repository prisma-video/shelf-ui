import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDfinityAuth } from "../../context/DfinityContextProvider";

const Header = () => {
    const auth = useDfinityAuth();
    const history = useHistory();

    const handleLogout = async () => {
        await auth.logOut();
        console.log(auth);
        history.push("/");
    };

    return (
    <header className="header">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="header__content">
                        <Link to="/" className="header__logo">
                        <img src="./img/logo.svg" alt="" className="header__logo" />
                        </Link>
                        <ul className="header__nav">
                        <li className="header__nav-item">
                            <Link to="/"className="header__nav-link" >Home</Link>
                        </li>

                        {auth.isAuthenticated ?
                        <>
                        <li className="header__nav-item">
                            <Link to="/catalog" className="header__nav-link">Discover</Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/catalog" className="header__nav-link">Community</Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/myshelf" className="header__nav-link">My Shelf</Link>
                        </li>
                        </>
                        :
                        <li className="header__nav-item">
                            <Link to="/contact" className="header__nav-link">Contact</Link>
                        </li>
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
                            <button onClick={handleLogout} className="header__sign-in">
                                <i className="icon ion-ios-log-in"></i>
                                <span>sign out</span>
                            </button>
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