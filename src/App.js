import React    from "react";
import {
       BrowserRouter as Router,
       Switch,
       Route,
       Link
}               from "react-router-dom";
import Home     from './Home';
import Search   from './Search';
import Variants from './Variants';
import Navbar   from './Navbar';
import Footer   from './Footer';


export default function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route path="/search"   component={Search} />
          <Route path="/variants" component={Variants} />
          <Route path="/"         component={Home} />
        </Switch>
        <Footer />
    </Router>
  );
}