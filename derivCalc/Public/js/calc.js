const select = (selector) => document.querySelector(selector)
const form = select('.calculator-input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  await postData(formData);
  console.log('form is submitting');
});

const postData = async (data) => {
  const result = await fetch('http://localhost:5500/api/create', {
    method:'POST',
    body: data,
  });

  if(result.ok){
    const response = await result.json()
    if(response.success){
      document.getElementById("result").innerText = response.ans; 
    }
  }
};

function toTex(exp) {
  for(let i = 0; i<exp.length; i++){
    if(exp.charAt(i) === '/'){
      let temp = i, start, end;
      while(exp.charAt(i) != '('){
        i--;
      }
      start = i, i = temp;
      while(exp.charAt(i) != ')'){
        i++;
      }
      end = i+1, i = temp,sub = exp.substring(start, end), res = exp.substring(start, end);
      res = res.replace('(', "\\frac{");
      res = res.replace(')', "}");
      res = res.replace('/', "}{");
      // console.log(exp.substring(start, end));
      // console.log(res);
      // console.log(exp.replace(sub,res));
      exp = exp.replace(sub,res);
    } else if(exp.charAt(i) === '^'){
      exp = exp.slice(0,i+1) + '{' + exp.slice(i+1);
      if(exp.charAt(i+2) === '('){
        i += 2;
        let numL = 1, numR = 0;
        while(numL!=numR){
          i++;
          if(exp.charAt(i) === '('){
            numL++;
          } else if(exp.charAt(i) === ')'){
            numR++;
          }
        }
        exp = exp.slice(0,i+1) + '}' + exp.slice(i+1);
      } else{
        i += 2;
        while(!isNaN(parseInt(exp.charAt(i)))){
          i++;
        }
        exp = exp.slice(0,i) + '}' + exp.slice(i);
      }
      console.log(exp);
    }
  }
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