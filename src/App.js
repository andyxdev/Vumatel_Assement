import React from 'react';
import './bootstrap.min.css';

import Installations from './components/Installations';
import Add from './components/Add';
import Update from './components/Update';
import Status from './components/Status';

import {Switch,Route,Link} from 'react-router-dom';

function App(){
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <Link className="navbar-brand" to="/">VumaTel</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Installations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Add</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/" component={Installations} exact />
        <Route path="/add" component={Add} />
        <Route path="/update/:id" component={Update} />
      </Switch>
    </div>
  );
}

export default App;
