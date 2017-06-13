import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import configureStore from './store';

import Home from './Home/Home.js';
import Quiz from './Quiz/Quiz.js';
import Result from './Result/Result.js';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/quiz">Quiz</Link></li>
          <li><Link to="/result">Result</Link></li>
          
        </ul>

        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/quiz" component={Quiz}/>
        <Route path="/result" component={Result}/>
        
      </div>
    </Router>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
