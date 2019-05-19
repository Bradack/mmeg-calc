import React from 'react';

import calcLogic from './calc/calcLogic.js'

import monsters from './../data/region01-monsters.js';

import './Calculator.css';

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      goals: {}
    };

    monsters.listOrder.forEach(monster => this.state.goals[monster] = '')

    this.handleGoalInput = this.handleGoalInput.bind(this)
    this.submitValues = this.submitValues.bind(this);
  }

  handleGoalInput(e) {
    console.log('Handling input');
    console.log('e.target.value:', e.target.value);
    
    if(parseInt(e.target.value)) {
      console.log('State of state:', this.state.goals);
      // console.log('Full event:', e);
      // console.log('e.nativeEvent:', e.nativeEvent);
      let newGoals = {...this.state.goals}
      console.log('newGoals:', newGoals);
      newGoals[e.nativeEvent.target.id] = parseInt(e.target.value);
      this.setState({goals: newGoals});
      console.log('state:', this.state);
    } else if(e.target.value === '') {
      let newGoals = {...this.state.goals}
      newGoals[e.nativeEvent.target.id] = 0;
      this.setState({goals: newGoals});
    }
  }

  generateInputList() {
    let inputItems = []
    monsters.listOrder.forEach( (item,i) => {
      let inputItem = 
        <div key={i}>
          {item}:
          <input id={item} onChange={this.handleGoalInput} value={this.state.goals[item]}></input>
        </div>
      inputItems.push(inputItem);
    })

    return inputItems
  }

  submitValues() {
    let goals = {...this.state.goals}
    let outGoals = []

    for(let goal in goals) {
      if(goals[goal]) {
        let tempGoal = {}
        tempGoal.name = goal;
        tempGoal.number = 1000 - goals[goal]
        outGoals.push(tempGoal);
      }
    }
    
    let results = calcLogic(outGoals, 'Floating Islands');
    console.log('results:', results);
  }

  render() {

    return (
      <div>
        <div className='input-holder'>
          {this.generateInputList()}
        </div>
        <button onClick={this.submitValues}>Submit</button>
      </div>
    )
  }
}

export default Calculator