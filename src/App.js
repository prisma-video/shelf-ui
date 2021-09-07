import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainView from './containers/MainView';
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
    <Switch>
      <Route path ="/movie" component={MovieView} />
      <Route path ="/catalog" component={CatalogView} />
      <Route exact path ="/" component={MainView} />
    </Switch>
  </Router>
  </HelmetProvider>
  );
}

export default App;
