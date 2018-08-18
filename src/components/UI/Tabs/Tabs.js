import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab/Tab';
import '../../../styles/Styles.css';

class Tabs extends React.Component {
  state = { activeTab: this.props.children[0].props.label };

  onClickTab = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTab,
      props: { children },
      state: { activeTab }
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map(child => {
            const { label } = child.props;
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTab}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map(child => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired
};
