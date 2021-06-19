import React, { useState, useEffect } from 'react';
import { UserMain } from './Components/UserMain';
import { AdminMain } from './Components/AdminMain';

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
