import React from 'react'
import Home from "./Components/Home/Home";
import Nav from "./Components/Nav/NavBar";
import {Route,BrowserRouter} from "react-router-dom";
import Page2 from "./Components/Page2/Page2";

function App() {
  return (
    <BrowserRouter >
    <Nav/>
    
      <Route exact path="/">
        <Home />
      </Route>
      <Route  path="/page2/:string">
        <Page2/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
