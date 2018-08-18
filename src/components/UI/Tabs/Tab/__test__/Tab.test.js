import React from 'react';
import ReactDOM from 'react-dom';
import Tab from '../Tab';

describe('TLD Calculater', () => {
  it('renders without crashing', () => {
    const props = {
      activeTab: '',
      label: 'test',
      onClick: () => console.log('Tab clicked')
    };
    const div = document.createElement('div');
    ReactDOM.render(<Tab {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
