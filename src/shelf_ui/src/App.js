import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalContext from './context/GlobalContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import ProfileView from './containers/ProfileView';
import SignInView from './containers/SignInView';
import CatalogView from './containers/CatalogView';
import MovieView from './containers/MovieView';

const meta = {
  title: 'The SHELF',
  description: 'The Universal Movie Library',
}

function App() {
  return (
  <HelmetProvider>
  <Helmet>
    <title>{ meta.title }</title>
    <meta name="description" content={ meta.description } />
  </Helmet>
  <Router>
    <GlobalContext>
      <Header />
      <Switch>
        <Route path ="/movie/:id" component={MovieView} />
        <Route path ="/singin" component={SignInView} />
        <Route path ="/profile" component={ProfileView} />
        <Route path ="/pricing" component={() => <CatalogView mode={"pricing"} />} />
        <Route path ="/myshelf" component={() => <CatalogView mode={"myshelf"} />} />
        <Route exact path ="/" component={() => <CatalogView mode={"catalog"} />} />
      </Switch>
      <Footer />
    </GlobalContext>
  </Router>
  </HelmetProvider>
  );
}

export default App;
