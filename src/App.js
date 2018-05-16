import React, { Component } from 'react';
import './App.css';

var moment = require('moment');

class App extends Component {

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
  }

  getDueDate = (start, interval) => {
    this.setState({ dateDue: moment(start).add(interval, 'days').format("MM-DD-YYYY") })
  }

  handleDates = () => {
    let rcvdDate = moment(this.state.dateRcvd).format("MM-DD-YYYY");
    let corrDate = moment(this.state.dateCorr).format("MM-DD-YYYY");
    let due = 
      moment(this.state.tldType === 'rcvd' ? this.state.dateRcvd : this.state.dateCorr)
      .add(+this.state.days, 'days')
      .format('MM-DD-YYYY');
    let suggested = 
      moment(this.state.tldType === 'rcvd' ? this.state.dateRcvd : this.state.dateCorr)
        .add(+this.state.days - 2, 'days')
        .format('MM-DD-YYYY');
    this.setState({
      dateRcvd: rcvdDate,
      dateCorr: corrDate,
      dateDue: due,
      dateSugg: suggested
    });
  }

  formSubmitHandler = (event) => {

    event.preventDefault();

    this.handleDates();

    if (+this.state.amount >= +this.state.limits) {
      this.setState({ excess: true });
    }

    this.setState({ generated: true });
  }

  formChangeHandler = (event) => {
    let key = event.target.name;
    let value = event.target.value;

    if (key === 'tldType') {

      if (value === 'other') {
        value = 'corr';

        this.setState({
          otherChecked: true,
          rcvdChecked: false,
          corrChecked: false,
          [key]:value
        });
      }
      else if (value === 'rcvd') {
        this.setState({
          otherChecked: false,
          rcvdChecked: true,
          corrChecked: false,
          [key]:value
        });
      }
      else{
        this.setState({
          otherChecked: false,
          rcvdChecked: true,
          corrChecked: false,
          [key]:value
        });
      }
    }
    else {
      this.setState({ [key]: value });
    }  
  }

  

  render() {
    // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
    
    const formattedAmt = (this.state.amount) ? formatter.format(this.state.amount) : null;
    const formattedLimits = (this.state.limits) ? formatter.format(this.state.limits) : null;
    return (
      <div className="App">
        { this.state.generated === false ? 
          <React.Fragment>
            <h2>TLD Task Tracker Generator</h2>
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
                  />Due XX days from Date on Letter
                </label>
                <label>
                  <input
                    type="radio"
                    name="tldType"
                    value="rcvd"
                    onChange={this.formChangeHandler}
                    checked={this.state.rcvdChecked}
                  />Due XX days from Date of Receipt
                </label>
                <label>
                  <input
                    type="radio"
                    name="tldType"
                    value='other'
                    onChange={this.formChangeHandler}
                    checked={this.state.otherChecked}
                  />Due XX days, start Date Unspecified
                </label> 
              </div>
              <div>
                <label htmlFor="dateRcvd">Date Recieved: </label>
                <input type="date" name="dateRcvd" value={(this.state.dateRcvd) ? this.state.dateRcvd : ''} onChange={this.formChangeHandler} placeholder="MM-DD-YYY"/>
              </div>
              <div>
                <label htmlFor="dateCorr">Correspodence Date: </label>
                <input type="date" name="dateCorr" value={(this.state.dateCorr) ? this.state.dateCorr : ''} onChange={this.formChangeHandler}  placeholder="MM-DD-YYY"/>
              </div>
              <div>
                <label htmlFor="days">Days Allowed: </label>
                <input type="number" name="days"  value={this.state.days ? this.state.days : ''} onChange={this.formChangeHandler}/>
              </div>
              <div>
                <label htmlFor="amount">Amount: </label>
                <input type="number" name="amount" value={this.state.amount ? this.state.amount : ''} onChange={this.formChangeHandler} />
              </div>
              <div>
                <label htmlFor="limits">Single injury limit: </label>
                <input type="number" name="limits" value={this.state.limits ? this.state.limits : ''} onChange={this.formChangeHandler} />
              </div>
              <div className="checkbox">
                <label>Conditions: <span/>
                  <input type="checkbox" name="conditions" value={this.state.conditions ? this.state.conditions : true} onChange={this.formChangeHandler} />
                </label>
              </div>
              <button className="btn btn-primary" onClick={this.formSubmitHandler}>Generate</button>
            </form>
          </div>
        </React.Fragment>

        :

        <React.Fragment>
          <div>
            <h2>TLD Task Note</h2>
            <p>(Copy & paste below into Outlook Task Report)</p>
          </div>

          <div>
              <p className="task">TLD Demand Date: { this.state.dateCorr }</p>
              <p className="task">TLD Received: { this.state.dateRcvd }</p>
              <p className="task">Suggested Completion Date: { this.state.dateSugg }</p>
              <p className="task">TLD Due Date: { this.state.dateDue }</p>
              <p className="task">TLD Amount: { formattedAmt }</p>
              <p className="task">Policy Limits: { formattedLimits }</p>
              <p className="task">Excess: { this.state.excess ? 'Yes' : 'No' }</p>
              <p className="task">{ this.state.excess ? 'Insured notified: mm/dd/yyyy'  : null }</p>
              <p className="task">{ this.state.excess ? 'Excess Letter Sent : mm/dd/yyyy'  : null }</p>
              <p className="task">TLD Conditions: { this.state.conditions ? 'Yes' : 'No' }</p>
          </div>
        </React.Fragment>
      }
    </div>
  );
  }
}

export default App;
