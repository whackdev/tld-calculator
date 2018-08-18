import React, { Component } from 'react';
import '../../styles/Styles.css';
import Task from './Task/Task';

var moment = require('moment');

class DueDate extends Component {
  state = {
    generated: false,
    amount: null,
    conditions: false,
    corrChecked: true,
    dateCorr: null,
    dateDue: null,
    dateRcvd: null,
    dateSugg: null,
    days: null,
    excess: false,
    limits: null,
    otherChecked: false,
    rcvdChecked: false,
    tldType: 'corr'
  };

  getDueDate = (start, interval) => {
    this.setState({
      dateDue: moment(start)
        .add(interval, 'days')
        .format('MM-DD-YYYY')
    });
  };

  handleDates = () => {
    let rcvdDate = moment(this.state.dateRcvd).format('MM-DD-YYYY');
    let corrDate = moment(this.state.dateCorr).format('MM-DD-YYYY');
    let due = moment(
      this.state.tldType === 'rcvd' ? this.state.dateRcvd : this.state.dateCorr
    )
      .add(+this.state.days - 1, 'days')
      .format('MM-DD-YYYY');
    let suggested = moment(
      this.state.tldType === 'rcvd' ? this.state.dateRcvd : this.state.dateCorr
    )
      .add(+this.state.days - 3, 'days')
      .format('MM-DD-YYYY');
    this.setState({
      dateRcvd: rcvdDate,
      dateCorr: corrDate,
      dateDue: due,
      dateSugg: suggested
    });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    this.handleDates();

    if (+this.state.amount >= +this.state.limits) {
      this.setState({ excess: true });
    }

    this.setState({ generated: true });
  };

  formChangeHandler = event => {
    let key = event.target.name;
    let value = event.target.value;

    if (key === 'tldType') {
      if (value === 'other') {
        value = 'corr';

        this.setState({
          otherChecked: true,
          rcvdChecked: false,
          corrChecked: false,
          [key]: value
        });
      } else if (value === 'rcvd') {
        this.setState({
          otherChecked: false,
          rcvdChecked: true,
          corrChecked: false,
          [key]: value
        });
      } else {
        this.setState({
          otherChecked: false,
          rcvdChecked: true,
          corrChecked: false,
          [key]: value
        });
      }
    } else {
      this.setState({ [key]: value });
    }
  };

  render() {
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });

    const formattedAmt = this.state.amount
      ? formatter.format(this.state.amount)
      : null;
    const formattedLimits = this.state.limits
      ? formatter.format(this.state.limits)
      : null;
    return (
      <React.Fragment>
        {this.state.generated === false ? (
          <React.Fragment>
            <h3>TLD Task Tracker Generator</h3>
            <p>Calculate TLD due date</p>
            <div className="form-group">
              <form onSubmit={this.formSubmitHandler}>
                <div style={{ marginBottom: '5px' }}>
                  <label>
                    <input
                      type="radio"
                      name="tldType"
                      onChange={this.formChangeHandler}
                      value="corr"
                      checked={this.state.corrChecked}
                    />
                    Due XX days from Date on Letter
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tldType"
                      value="rcvd"
                      onChange={this.formChangeHandler}
                      checked={this.state.rcvdChecked}
                    />
                    Due XX days from Date of Receipt
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tldType"
                      value="other"
                      onChange={this.formChangeHandler}
                      checked={this.state.otherChecked}
                    />
                    Due XX days, start Date Unspecified
                  </label>
                </div>
                <div>
                  <label htmlFor="dateRcvd">Date Recieved: </label>
                  <input
                    type="date"
                    name="dateRcvd"
                    value={this.state.dateRcvd ? this.state.dateRcvd : ''}
                    onChange={this.formChangeHandler}
                    placeholder="MM-DD-YYYY"
                  />
                </div>
                <div>
                  <label htmlFor="dateCorr">Correspodence Date: </label>
                  <input
                    type="date"
                    name="dateCorr"
                    value={this.state.dateCorr ? this.state.dateCorr : ''}
                    onChange={this.formChangeHandler}
                    placeholder="MM-DD-YYYY"
                  />
                </div>
                <div>
                  <label htmlFor="days">Days Allowed: </label>
                  <input
                    type="number"
                    name="days"
                    value={this.state.days ? this.state.days : ''}
                    onChange={this.formChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="amount">Amount: </label>
                  <input
                    type="number"
                    name="amount"
                    value={this.state.amount ? this.state.amount : ''}
                    onChange={this.formChangeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="limits">Single injury limit: </label>
                  <input
                    type="number"
                    name="limits"
                    value={this.state.limits ? this.state.limits : ''}
                    onChange={this.formChangeHandler}
                  />
                </div>
                <div className="checkbox">
                  <label>
                    Conditions: <span />
                    <input
                      type="checkbox"
                      name="conditions"
                      value={
                        this.state.conditions ? this.state.conditions : true
                      }
                      onChange={this.formChangeHandler}
                    />
                  </label>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={this.formSubmitHandler}
                >
                  Generate
                </button>
              </form>
            </div>
          </React.Fragment>
        ) : (
          <Task
            conditions={this.state.conditions}
            dateCorr={this.state.dateCorr}
            dateDue={this.state.dateRcvd}
            dateRcvd={this.state.dateRcvd}
            dateSugg={this.state.dateSugg}
            excess={this.state.excess}
            formattedAmt={formattedAmt}
            formattedLimits={formattedLimits}
          />
        )}
      </React.Fragment>
    );
  }
}

export default DueDate;
