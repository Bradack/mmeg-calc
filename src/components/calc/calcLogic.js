import lpSolver from 'javascript-lp-solver'

import levelData from './../../data/allRegions';

export default (goals, region) => {

  let levels = levelData.campaign[region].levels;
  let constraints = {}
  
  /*------------------------------------------------------------------------------
  -----Construct the proper constraints based off goals---------------------------
  ------------------------------------------------------------------------------*/
  goals.forEach(goal => {
    constraints[goal.name] = { min: goal.number }
  })

  /*------------------------------------------------------------------------------
  -----Set the parameters to solve the LP by--------------------------------------
  ------------------------------------------------------------------------------*/
  let model = {
    optimize: 'energy',
    opType: 'min',
    constraints,
    variables: levels
  }
  
  let results = lpSolver.Solve(model);
  /*------------------------------------------------------------------------------
  -----Delete unnecessary values--------------------------------------------------
  ------------------------------------------------------------------------------*/
  delete results.feasible;
  results.energy = results.result;
  delete results.result;
  delete results.bounded;
  
  /*------------------------------------------------------------------------------
  -----Rounds decimal values up---------------------------------------------------
  ------------------------------------------------------------------------------*/
  let formatted = {  }
  for(let item in results) {
    formatted[item] = Math.ceil(results[item]);
  }

  return formatted;
}