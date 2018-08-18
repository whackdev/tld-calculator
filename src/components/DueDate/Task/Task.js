import React from 'react';
import PropTypes from 'prop-types';
import TaskHeader from './TaskHeader';

class Task extends React.Component {
  render() {
    const {
      dateCorr,
      dateRcvd,
      dateSugg,
      dateDue,
      formattedAmt,
      formattedLimits,
      excess,
      conditions
    } = this.props;
    return (
      <React.Fragment>
        <TaskHeader />
        <div className="task">
          <p>TLD Demand Date: {dateCorr}</p>
          <p>TLD Received: {dateRcvd}</p>
          <p>Suggested Completion Date: {dateSugg}</p>
          <p>TLD Due Date: {dateDue}</p>
          <p>TLD Amount: {formattedAmt}</p>
          <p>Policy Limits: {formattedLimits}</p>
          <p>Excess: {excess ? 'Yes' : 'No'}</p>
          <p>{excess ? 'Insured notified: mm/dd/yyyy' : null}</p>
          <p>{excess ? 'Excess Letter Sent : mm/dd/yyyy' : null}</p>
          <p>TLD Conditions: {conditions ? 'Yes' : 'No'}</p>
        </div>
      </React.Fragment>
    );
  }
}

Task.propTypes = {
  dateCorr: PropTypes.string.isRequired,
  dateRcvd: PropTypes.string.isRequired,
  dateSugg: PropTypes.string.isRequired,
  dateDue: PropTypes.string.isRequired,
  formattedAmt: PropTypes.string.isRequired,
  formattedLimits: PropTypes.string.isRequired,
  excess: PropTypes.bool.isRequired,
  conditions: PropTypes.bool.isRequired
};

export default Task;
