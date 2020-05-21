import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";

const About = () => (
  <div>
    <h2>About</h2>
    <p>
      Powered by React
      {React.version}
    </p>
    <p>Author: Denisenko Viacheslav</p>

    <Button variant="contained" color="primary">
      Just Material Button
    </Button>
  </div>
);

export default About;
