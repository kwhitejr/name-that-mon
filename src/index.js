/*
`index.js` is the entry point for the front-end. The <App /> component is injected into `public/index.html`.   
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Import the redux store
import configureStore from './store';

// Import the Containers, i.e. different page views. Ultimately this should be refactored into a `router.js`
import Home from './Home/Home.js';
import Quiz from './Quiz/Quiz.js';
import Result from './Result/Result.js';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = configureStore();

/* <App /> is the top-level React component.
*  <MuiThemeProvider> is a wrapper component for Material-UI
*  <Router> is a wrapper component for React Router. It handles navigation through each pageview. The `path` attribute describes the URL and the `component` attribute describes the React component to be used. These top-level router components are also referred to as "Containers". 
*/
const App = () => (
  <MuiThemeProvider>
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
  </MuiThemeProvider>
)

// This code injects the React app into `public/index.html`
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
