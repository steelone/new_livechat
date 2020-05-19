import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';

class About extends PureComponent {

  render() {
    return (
      <div>
        <h2>About</h2>
        <p>
          Powered by React
          {React.version}
        </p>
        <p>Author: Denisenko Viacheslav</p>

        <Button variant="contained" color="primary">
          Material Button
        </Button>
      </div>
    );
  }

}

export default About;
