import React from 'react';

import img_futurama from '../../images/futurama.jpg';

export default class App extends React.Component {
  render() {
    return (
     <div>
        <h1>Hello World</h1>
        <p>
          <img src={img_futurama} />
        </p>
      </div>
    );
  }
}