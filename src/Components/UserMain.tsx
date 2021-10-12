import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Home } from './Home';
import { Registration } from './Auth/Registration';
import { Login } from './Auth/Login';
import { MyPageEdit } from './pages/user/MyPageEdit';
import { PostIndex } from './pages/user/PostIndex';
import { TrainingIndex } from './pages/user/TrainingIndex';
import { TrainingHistory } from './pages/user/TrainingHistory';
import { UserTop } from './pages/user/UserTop';
import { MyPage } from './pages/user/MyPage';
import { WeightIndex } from './pages/user/WeightIndex';
import { WeightNew } from './pages/user/WeightNew';

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
    setIsLogin(false);
    localStorage.clear();
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
              <UserTop isSignUp={isSignUp}/>
            )}
          />
          <Route
            exact path={"/user/:id"}
            render={props => (
              <MyPage/>
            )}
          />
          <Route
            exact path={"/user/edit/:id"}
            render={props => (
              <MyPageEdit/>
            )}
          />
          <Route
            exact path={"/weight_management"}
            render={props => (
              <WeightIndex/>
            )}
          />
          <Route
            exact path={"/weight_management/new"}
            render={props => (
              <WeightNew/>
            )}
          />
          <Route
            exact path={"/posts"}
            render={props => (
              <PostIndex/>
            )}
          />
          <Route
            exact path={"/trainings"}
            render={props => (
              <TrainingIndex/>
            )}
          />
          <Route
            exact path={"/historys"}
            render={props => (
              <TrainingHistory/>
            )}
          />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  );
}