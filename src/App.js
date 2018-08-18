import React from 'react';
import DueDate from './components/DueDate/DueDate';
import Tabs from './components/UI/Tabs/Tabs';
import DayCalc from './components/DayCalc/DayCalc';

const App = () => {
  return (
    <div className="App">
      <React.Fragment>
        <h1>TLD Calculators</h1>
      </React.Fragment>
      <React.Fragment>
        <Tabs>
          <div label="Due Date">
            <DueDate />
          </div>
          <div label="Number of Days">
            <DayCalc />
          </div>
        </Tabs>
      </React.Fragment>
    </div>
  );
};

export default App;
