import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './pages/homepage/home';
import EasyMood from './pages/dashboardpage/easyMood'
import MediumMood from './pages/dashboardpage/mediumMood'
import HardMood from './pages/dashboardpage/hardMood'
import RiseLoader
 from "react-spinners/RiseLoader";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    }, 2000)
  }, [])


  return (
    <div className="App">
      {loading?
        <RiseLoader color={"#000705"} loading={loading} size={"3vh"} /> 
      :
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard/easy_mood/:str" exact component={EasyMood} />
          <Route path="/dashboard/medium_mood/:str" exact component={MediumMood} />
          <Route path="/dashboard/hard_mood/:str" exact component={HardMood} />

        </Switch>
      </Router>}
      
    </div>
  );
}

export default App;
