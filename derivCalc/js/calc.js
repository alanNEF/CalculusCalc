function calculate(){
  let func = document.getElementById("function").value;
  console.log(func)
  document.getElementById("result").innerText = calc(func); 
}
function deriv (equ){
  const equArray = []; // array of terms in the equation
  const equSigns = []; //array of signs of each term
  let term = ""; //individual term
  for(let i = 0; i<equ.length; i++){ // array that goes through the equation
	  if(equ[i] != '+' && equ[i] != '-' && equ[i] != ' ' && equ[i]!='*'){ // checks for term seperator
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
    if(equArray[k] === 'sinx'){ equArray[k] = 'cosx'; }
    else if(equArray[k] === 'cscx'){ equArray[k] = '-cscxtanx'; }
    else if(equArray[k] === 'cosx'){ equArray[k] = '-sinx'; }
    else if(equArray[k] === 'secx'){ equArray[k] = 'secxtanx'; }
    else if(equArray[k] === 'tanx'){ equArray[k] = 'sec^2x'; }
    else if(equArray[k] === 'cotx'){ equArray[k] = 'csc^2x'; }
    else if(equArray[k] === 'e^x'){ equArray[k] = 'e^x'; }
    else if(equArray[k] === 'lnx'){ equArray[k] = '1/(x)' }
    else if(equArray[k].includes("^")){
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
    } else if(equSigns[k]==='*'){} // makes it so it does not treat coefficents as regular terms
    else{
      equArray.splice(k, 1); // get rid of single terms without x
    }
  }
  let out = r === equSigns.length ? ("-" + equArray[0]) : equArray[0]; //accounts for if the frist element of the array is negative instead of positive
  for(let j = 1; j<equArray.length; j++){ //goes through both arrays
    out += (r === equSigns.length ? equSigns[j] : equSigns[j-1]) + equArray[j]; //adds all term to the output
    out = out.replace('*', '');
  }
  return out; // return result
}

function calc(equ){
  let innerFunction = equ.substring(equ.indexOf('(')+1, equ.lastIndexOf(')')); // find the inner function through parenthesis
  let outerFunction = (equ.substring(0,equ.indexOf('(')+1) + equ.substring(equ.lastIndexOf(')'))).replace('()', 'x'); // finds outer function by seeing whats outside parenthesis
  return innerFunction==="" ? deriv(outerFunction) : '(' + deriv(innerFunction) + ')' + deriv(outerFunction).replaceAll('x', '(' + innerFunction + ')'); // reurns the result by following the chain rule formula
}
function formatEditor(equ){
  let out = "";
  const equTerms = []; //array of terms in the equation
  let term = ""; //individual term
  for(let i = 0; i<equ.length; i++){ //array that goes through the equation (very similar to the deriv func above)
	  if(equ[i] != '(' && equ[i] != ')' && equ[i] != ' '){ //checks for term seperator
		  term += equ[i]; //adds char to term
    } else{
      equTerms.push(term); //adds term to the array
      term = ""; //sets term back to empty
    }
  }
  for(let j = 0; j<equTerms.length; j++){ //loop is used to connect trig functions an others to its inner part when seperated in the last loop
    if(equTerms[j].includes('cos') || equTerms[j].includes('sin') || equTerms[j].includes('csc') || equTerms[j].includes('sec') || equTerms[j].includes('tan') || equTerms[j].includes('cot') || equTerms[j].includes('ln') || equTerms[j].includes('e^')){ // searches for these cases
      equTerms[j] = equTerms[j] + '(' + equTerms[j+1] + ')'; // combines the current and next index in the array
      equTerms.splice(j+1,1); //removes the next index in the array
    } else if(equTerms[j].length===0){ //deletes any empty spots
      equTerms.splice(j,1);
    }
  }
  console.log(equTerms);
  for(let k = 0; k < equTerms.length; k++){
    out += equTerms[k];
  }
  return out;
}

function derivCalc (equ){
  const stack = []; //stack with equation operators
  const que = []; // que for final arithmatic
  let term; //
  for(let i = 0; i<equ.length; i++){ // loops through string
    if(!isNaN(parseInt(equ[i]))){ //
      term = equ[i];
      for(let j = i+1; j<equ.length; j++){
        if(!isNaN(parseInt(equ[j]))){
          term += equ[j];
          i++;
        } else{break;} // checks if num is more than one digit
      }
      que.push(parseInt(term)); // insantly adds digit to que
    } else if(equ[i] === '('){
      stack.push(equ[i]); // adds ( straight to stack)
    } else if(equ[i] === '+' || equ[i] === '-' || equ[i] === '/' || equ[i] === '*' || equ[i] === '^'){
      if(signPresidence(equ[i]) > signPresidence(stack[stack.length-1]) || stack[stack.length-1] === undefined){ // if the sign on top of stack has less precidence than the current sign it adds it to stack
        stack.push(equ[i]);
      } else {
        while(signPresidence(equ[i]) < signPresidence(stack[stack.length-1]) || signPresidence(equ[i]) === signPresidence(stack[stack.length-1]) || stack[stack.length-1] != undefined){ //if the sign on top of stack has more precidence than the current sign it pushes the top sign until thats not the case
          if(stack[stack.length-1] === '('){
            break;
          }
          que.push(stack.pop());
        }
        stack.push(equ[i]); // adds higher precidence sign to top of stack
      }
    } else if(equ[i] === ')'){
      while(stack[stack.length-1] != '('){
        if(stack.includes("sin(")){ // checks if it include sign
          if(stack[stack.length-1]==="sin("){ // adds sign and all stack between to que
            que.push(stack.shift()); 
            que.push(')');
          }else{que.push(stack.shift());}
        } else{
          if(stack[stack.length-1] === '('){ // checks for normal (
          } else{que.push(stack.pop());} // adds everything between itself and and the top of stack to que then deletes both()
        }
      }
      stack.pop(); 
    } else if(equ[i] === 's'){
      if(equ.substring(i, i+3) === "sin"){ // sin is treated as its own term and added to stack
        stack.unshift('sin(');
        i +=3;
      }
    }
  }
  while(stack.length != 0){
    que.push(stack.pop()); // moves all stack into que
  } 
  //Post fix stack evaluator
  while(que.length!=0){
    if(!isNaN(parseInt(que[0]))){ // checks if que has a number or an operator
      stack.push(que.shift());
    } else if(que[0] === '*'){ // does proper operation
      que.shift();
      stack.push(parseInt(stack.splice(stack.length-2,1)) * parseInt(stack.pop()));
    } else if(que[0] === '/'){
      que.shift();

      stack.push(parseInt(stack.splice(stack.length-2,1)) / parseInt(stack.pop()));
    } else if(que[0] === '+'){
      que.shift();
      stack.push(parseInt(stack.splice(stack.length-2,1)) + parseInt(stack.pop()));
    } else if(que[0] === '-'){
      que.shift();
      stack.push(parseInt(stack.splice(stack.length-2,1)) - parseInt(stack.pop()));
    }
  }
  return stack[0];
}

function signPresidence (sign){ // assigns signs their precidence
  if(sign==='-' || sign==='+'){
    return 1;
  } else if(sign === '/' || sign === '*'){
    return 2;
  } else if(sign === '^'){
    return 3;
  } else{
    return null;
  }
}
derivCalc("1+(5*4+3)-1");