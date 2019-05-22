import React from 'react';

import calcLogic from './calc/calcLogic.js'

import monsters from './../data/region01-monsters.js';

import './Calculator.css';

class Calculator extends React.Component {
  constructor() {
    super();

    let progress = {};
    monsters.listOrder.forEach(monster => progress[monster] = 0);
    
    this.state = {
      progress
    };


    this.handleProgressInput = this.handleProgressInput.bind(this)
    this.submitValues = this.submitValues.bind(this);
  }

  handleProgressInput(e) {
    console.log('Handling input');
    console.log('e.target.value:', e.target.value);
    
    if(parseInt(e.target.value)) {
      console.log('State of state:', this.state.progress);
      // console.log('Full event:', e);
      // console.log('e.nativeEvent:', e.nativeEvent);
      let newGoals = {...this.state.progress}
      console.log('newGoals:', newGoals);
      newGoals[e.nativeEvent.target.id] = parseInt(e.target.value);
      this.setState({progress: newGoals});
      console.log('state:', this.state);
    } else if(e.target.value === '') {
      let newGoals = {...this.state.progress}
      newGoals[e.nativeEvent.target.id] = 0;
      this.setState({progress: newGoals});
    }
  }

  generateInputList() {
    let inputItems = []
    monsters.listOrder.forEach( (item,i) => {
      let inputItem = 
        <div key={i}>
          {item}:
          <input id={item} onChange={this.handleProgressInput} value={this.state.progress[item]}></input>
        </div>
      inputItems.push(inputItem);
    })

    return inputItems
  }

  submitValues() {
    let progress = {...this.state.progress}
    let outGoals = []
    console.log('progress:', progress);
    
    for(let item in progress) {
      // if(progress[item]) {
        let tempGoal = {}
        tempGoal.name = item;
        tempGoal.number = 1000 - progress[item]
        outGoals.push(tempGoal);
      // }
    }
    console.log('outGoals:', outGoals);
    
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