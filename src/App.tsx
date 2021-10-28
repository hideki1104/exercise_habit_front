import React, { useState, useEffect } from 'react';
import { UserMain } from './Components/organisms/UserMain';
import { AdminMain } from './Components/organisms/AdminMain';

function App() {
  const [ isAdmin, setIsAdmin ] = useState(false);

  useEffect(() => {
    if (window.location.href.match("/admin") != null) {
      setIsAdmin(true);
    }
  })

  return(
    <>
      {isAdmin ? (<AdminMain/>) : (<UserMain/>)}
    </>
  );
}

export default App;
