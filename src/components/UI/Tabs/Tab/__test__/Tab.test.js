import React from 'react';
import { render } from 'react-testing-library';
import Tab from '../Tab';

const props = {
  activeTab: '',
  label: 'test',
  onClick: () => console.log('Tab clicked')
};

describe('TLD Calculater', () => {
  it('should render the tab with `props`', () => {
    const { queryByText } = render(<Tab {...props} />);
    const tabNode = queryByText(props.label);
    expect(tabNode.innerHTML).toBe(props.label);
  });
});
