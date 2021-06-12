import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Home } from './Components/Home';
import { Registration } from './Components/Auth/Registration';

function App() {
  return(
    <>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route
            exact path={"/"}
            render={props => (
              <Home/>
            )}
          />
          <Route
            exact path={"/sign_up"}
            render={props => (
              <Registration/>
            )}
          />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
