import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Slots from './Components/Slots';
import History from './Components/History';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Slots} />
    <Route path="/all" component={History} />
  </Route>
);
