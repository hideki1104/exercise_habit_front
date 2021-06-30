import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Home } from './Home';
import { Registration } from './Auth/Registration';
import { Login } from './Auth/Login';
import { Top } from './User/Top';
import { Detail } from './User/Detail';
import { UserEdit } from './User/UserEdit';

interface UserMainProps {

}

export const UserMain: React.FC<UserMainProps> = () => {
  const [isLogin, setIsLogin]   = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("headers") != null) {
      setIsLogin(true)
    }
  })

  type ResponseHeader = {
    'access-token': string
    'cache-control': string
    'client': string
    'content-type': string
    'uid': string
  }

  type UserData = {
    allow_password_change: boolean
    email: string
    id: number
    image: string | null
    name: string
    nickname: string | null
    provider: string
    uid: string
  }

  const handleLogin = (userData:UserData, responseHeader:ResponseHeader, isSignUp:boolean = false):void => {
    localStorage.setItem("headers", JSON.stringify(responseHeader));
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsLogin(true);
    if (isSignUp) {
      setIsSignUp(true);
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  }

  return(
    <>
      <BrowserRouter>
        <Header isAdmin={false} isLogin={isLogin} handleLogout={handleLogout}/>
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
            exact path={"/user/top"}
            render={props => (
              <Top isSignUp={isSignUp}/>
            )}
          />
          <Route
            exact path={"/user/:id"}
            render={props => (
              <Detail/>
            )}
          />
          <Route
            exact path={"/user/edit/:id"}
            render={props => (
              <UserEdit/>
            )}
          />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  );
}