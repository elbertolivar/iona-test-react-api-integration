import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import { CatContextProvider } from './contexts/CatContext';
import { CatDetails } from './pages/CatDetails';
import { Home } from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <CatContextProvider>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path={`/:id`}>
            <CatDetails />
          </Route>
        </CatContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
