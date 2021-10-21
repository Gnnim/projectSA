import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import MedRecCreate from "./components/MedRecCreate";
import MedRec from "./components/MedRec";


export default function App() {

 return (

   <Router>

     <div>

       <Navbar />

       <Switch>

         <Route exact path="/" component={MedRec} />

         <Route exact path="/create" component={MedRecCreate} />

       </Switch>

     </div>

   </Router>

 );

}