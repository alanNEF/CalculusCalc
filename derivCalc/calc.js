const derivCalc = (equ) =>{
  const equArray = []; // array of terms in the equation
  let term = ""; //individual term
  for(let i = 0; i<equ.length; i++){ // array that goes through the equation
	  if(equ[i]!='+' && equ[i]!='-'){ // checks for term seperator
		  term += equ[i]; // adds char to term
    } else{
      equArray.push(term); // adds term to the array
      term = ""; // sets term back to empty
    }
  }
  equArray.push(term);//adds remaining term
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
    } else if(equArray[k].includes("x")){
      equArray[k] = equArray[k].replace('x', equArray[k] === "x" || equArray[k] === " x" || equArray[k] === "x " || equArray[k] === " x " ? '1' : ''); //gets rid of the x in x^1 cases
    } else{
      equArray.splice(k, 1);// get rid of single terms without x
    }
  }
  let out = equArray[0];
}
derivCalc("3x^4 + 4x^2 + x - 4");
