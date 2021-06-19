import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Home } from './Home';
import { Registration } from './Auth/Registration';
import { Login } from './Auth/Login';
import { AdminLogin } from './Auth/AdminLogin';
import { Detail } from './User/Detail';

interface UserMainProps {

}

export const UserMain: React.FC<UserMainProps> = () => {

  type ResponseHeader = {
    'access-token': string
    'cache-control': string
    'client': string
    'content-type': string
    'uid': string
  }

  const handleLogin = (userName: string, responseHeader:ResponseHeader):void => {
    localStorage.setItem("headers", JSON.stringify(responseHeader));
    localStorage.setItem("userName", userName);
  }

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
              <Registration handleLogin={handleLogin}/>
            )}
          />
          <Route
            exact path={"/sign_in"}
            render={props => (
              <Login handleLogin={handleLogin}/>
            )}
          />
          <Route
            exact path={"/user/:id"}
            render={props => (
              <Detail/>
            )}
          />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  );
}