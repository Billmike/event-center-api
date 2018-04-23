import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Homepage from './homepage';
import Signup from './Signup';
import Signin from './Signin';
import '../assets/css/style.css';

/**
 * App Function
 */
const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
