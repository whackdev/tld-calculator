import React from 'react';
import Tab from '../../../../../components/UI/Tabs/Tab/Tab';
import { render } from 'react-testing-library';

const props = {
  activeTab: '',
  label: 'test',
  onClick: () => console.log('Tab clicked')
};

it('should render the tab with `props.label`', () => {
  const { queryByText } = render(<Tab {...props} />);
  const tabNode = queryByText(props.label);
  expect(tabNode.innerHTML).toBe(props.label);
});

it('should have a properties `onClick` from props', () => {
  const { queryByText } = render(<Tab {...props} />);
  const tabNode = queryByText(props.label);
  expect(tabNode.onclick).toBeInstanceOf(Function);
});
