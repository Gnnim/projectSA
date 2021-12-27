import React, { Fragment, useEffect, useState } from 'react';

import Navbar from "./components/Navbar";
import MedicalRecord from './components/MedRec';
import MedicalRecordCreate from './components/MedRecCreate';
import Home from './components/Home';

import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  if (!token) {
    return <SignIn />
  }

  return (
    <div>
      <Router>
        {token && (
          <Fragment>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/list" component={MedicalRecord} />
              <Route exact path="/create" component={MedicalRecordCreate} />
              
            </Switch>
          </Fragment>
        )}
      </Router>
    </div>

  );
}

export default App;