function calculate(){
  let func = document.querySelector(".calcInput input");
  document.getElementById("function").innerText = func;
  document.getElementById("result").innerHTML = derivCalc(func); 
}
function derivCalc (equ){
  const equArray = []; // array of terms in the equation
  const equSigns = [];//array of signs of each term
  let term = ""; //individual term
  for(let i = 0; i<equ.length; i++){ // array that goes through the equation
	  if(equ[i] != '+' && equ[i] != '-' && equ[i] != ' '){ // checks for term seperator
		  term += equ[i]; // adds char to term
    } else if(equ[i] === ' '){}
     else if(i===0){
      equSigns.push(equ[i]); // if there is a negative out front this will account for that
    } else{
      equArray.push(term); // adds term to the array
      term = ""; // sets term back to empty
      equSigns.push(equ[i]); //adds sign to the array of signs, equSigns
    }
  }
  equArray.push(term); //adds remaining term
  let r = equArray.length; // placeholder var
  for(let k = 0; k < equArray.length; k++){ // goes through the array of equations
    if(equArray[k].includes("^")){
      let index = 0;
      let mult = parseInt(equArray[k].substring(equArray[k].indexOf("^")+1)); //finds power of the term
      if(equArray[k].substring(0,1) != "x"){
        let num = ""; // coefficent of the term
        for(let y = 0; y < equArray[k].indexOf('x'); y++){
          num += equArray[k].substring(y, y+1); // adds the chars of the coefficent
          index = y + 1; // saves index to replace later
        }
        mult = mult * parseInt(num); //multiplies the coefficent and power
      }
      equArray[k] = equArray[k].replace(equArray[k].substring(equArray[k].indexOf("^")+1), (parseInt(equArray[k].substring(equArray[k].indexOf("^")+1))-1).toString()); //makes the power one less
      equArray[k] = equArray[k].replace(equArray[k].substring(0, index), mult); // replaces the coefficent with new coefficent
      if(equArray[k].includes("^1")){equArray[k]=equArray[k].replace('^1','')} // gets rid of any x-terms with ^1
    } else if(equArray[k].includes("x")){
      equArray[k] = equArray[k].replace('x', ''); //gets rid of the x in x^1 cases
      equArray[k] = equArray[k] === '' || equArray[k] === ' ' ? 1 : equArray[k]; //checks for empty string
    } else{
      equArray.splice(k, 1); // get rid of single terms without x
    }
  }
  let out = r === equSigns.length ? ("-" + equArray[0]) : equArray[0]; //accounts for if the frist element of the array is negative instead of positive
  for(let j = 1; j<equArray.length; j++){ //goes through both arrays
    out += (r === equSigns.length ? equSigns[j] : equSigns[j-1]) + equArray[j]; //adds all term to the output
  }
  console.log(out); //prints the answer in the console
  return out;
}
