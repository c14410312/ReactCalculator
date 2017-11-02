
import {Observable} from 'rxjs/Rx';
import '../css/style.css';

let calcEquation = "";
let eq = document.getElementById('equation');
let len = calcEquation.length;

const ops = ['*', '/', '-', '+','(',')'];


//get all the buttons attached to the calculator
const buttons = document.getElementsByClassName("flex-item");

//now we need to create a stream
const $input = Observable.from(buttons)
.map(button => Observable.fromEvent(button, "click").mapTo(button.textContent))
.mergeAll().merge(Observable.fromEvent)
.merge(Observable.fromEvent(document, 'keypress').pluck('key'));

$input.subscribe(key => {
	
	if(key === 'C'){
		eq.value="";
  		calcEquation = "";
	}else if(key === '='){
		try{
			let res = eval(calcEquation);
		    eq.value=res;
		}catch(err){
		    document.getElementById('equation').value="Syntax Error";
		}
		calcEquation="";
	}else if(isNaN(key) === false || ops.includes(key)) {

		if(ops.indexOf(calcEquation[len - 1]) === -1){
   			calcEquation += key;
   			eq.value = calcEquation; 
  		}
  		else if(ops.indexOf(calcEquation[len - 1]) >= 0 && ops.indexOf(key) === -1){
    		calcEquation += key;
    		eq.value = calcEquation; 
  		}

	}
})