import React, { Component } from 'react';
import './Buttons.css';

const isPrime = (n) => {
  if(n<2) return false;
  let upperbound = Math.sqrt(n);
  for(let i=2; i<=upperbound; i++){
    if(n%i===0) return false;
  }
  return true;
}

class Buttons extends Component {
  constructor(){
    super();
    this.state = {
      counter :0,
      colorHistory: [],
      clickeMeButtonClass: 'transparent',
      recapColorButtonClass: 'transparent'
    }
  }
//update class name of recap button every 500ms
  handleRecap = (e) => {
    e.preventDefault();
    let colorHistory = this.state.colorHistory;
    let index= 0;
    var interval = setInterval(()=>{
      this.setState({
        recapColorButtonClass : colorHistory[index++]
      })
      if(index===colorHistory.length){
        clearInterval(interval);
      }
    },500)
  }
  
//increment counter on click event
  handleClick = (e) => {
    e.preventDefault();
    let counter = this.state.counter + 1;
    if(counter > 100) return;
    this.setState({
      counter: counter
    })
    /*
    precedence order is determined by the occurences of each cases
    */
    if(isPrime(counter)){
      this.setState({
        clickeMeButtonClass:'shadow',
        colorHistory: [...this.state.colorHistory, 'shadow']
      })
      return;
    }
    if(counter%5===3){
      this.setState({
        clickeMeButtonClass:'green',
        colorHistory: [...this.state.colorHistory, 'green']
      })
      return;
    }
    if(counter>0 && counter%10===0){
      this.setState({
        clickeMeButtonClass:'blue',
        colorHistory: [...this.state.colorHistory, 'blue']
      })
      return;
    }
    this.setState({
      clickeMeButtonClass:'transparent'
    })
  }
  render(){
    return (
      <div>
        <input type='button' name='clickMe' value={'click me: '+this.state.counter} id='clickMe' className={this.state.clickeMeButtonClass} onClick={this.handleClick}/>
        <input type='button' value='Recap Colors' onClick={this.handleRecap} className={this.state.recapColorButtonClass} id='recap'/>
      </div>
    )
  }
}

export default Buttons;
