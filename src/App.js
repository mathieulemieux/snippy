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
    <Router basename={''}>
        <Navbar />
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/search`}   component={Search} />
          <Route path={`${process.env.PUBLIC_URL}/variants`} component={Variants} />
          <Route path={`${process.env.PUBLIC_URL}/`}         component={Home} />
        </Switch>
        <Footer />
    </Router>
  );
}