import React from 'react';
import { shallow } from 'enzyme';
import App from '../app/assets/js/components/app';

test('Verify that App shows Hello World', () => {

  // Render a checkbox with label in the document
  const app = shallow(<App />);

  expect(app.find('h1').text()).toEqual('Hello World');

});