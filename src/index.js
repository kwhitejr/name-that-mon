/*
`index.js` is the entry point for the front-end. The <App /> component is injected into `public/index.html`.   
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Grid, Row, Col } from 'react-flexbox-grid';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Import the redux store
import { history, configureStore } from './store';

// Import Header
import Header from './Header/Header'

// Import the Containers, i.e. different page views. Ultimately this should be refactored into a `router.js`
import Home from './Home/Home.js';
import Quiz from './Quiz/Quiz.js';
import Result from './Result/Result.js';
import Stats from './Stats/Stats.js';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

injectTapEventPlugin();

// const history = createHistory()
const store = configureStore();

/* <App /> is the top-level React component.
*  <MuiThemeProvider> is a wrapper component for Material-UI
*  <Router> is a wrapper component for React Router. It handles navigation through each pageview. The `path` attribute describes the URL and the `component` attribute describes the React component to be used. These top-level router components are also referred to as "Containers". 
*/
const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Header />
          <Grid fluid>
            <Row>
              <Col 
                xs={12} 
                sm={7} 
                md={5} mdOffset={1} 
                lg={4} lgOffset={2}
              >
                <Route exact path="/" component={Home}/>
                <Route path="/quiz" component={Quiz}/>
                <Route path="/result" component={Result}/>
              </Col>
              <Col xs={12} sm={5} md={5} lg={4}>
                <Stats />
              </Col>
            </Row>
          </Grid>
        </div>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
)

// This code injects the React app into `public/index.html`
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
