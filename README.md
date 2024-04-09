# ➗ CalculusCalc
A calculus calculator built with JS
### ⚠️Warning⚠️
This calculator is intended solely for the purpose of verifying mathematical work and should not be used as a means to cheat or engage in academic dishonesty. It is designed to assist in understanding and confirming calculations, promoting a genuine learning experience. Any misuse of this tool for unethical purposes may have serious consequences. Use responsibly and in accordance with academic integrity principles.
## 📌About
This repository is meant to be a capable calculus calculator able to calculate derivatives and integrals. Its goal is to be able to evaluate derivatives with chain rule, quotient rule, and other derivative strategies. Additionally, it will be able to evaluate all integrals through U substitution or integrating by parts. Eventually, I would like to add steps to the solutions but for now only will return solutions.
## 🌐How It Works?
This calculator is powered by the JavaScript library Nerdamer. The user inputs a function that is read as a string and sent over to the server, where all the magic happens. The server uses Express and Multer to receive and read the string sent from the browser. This allows the computer to put it in terms understood by Nerdamer to calculate the derivative. From here, all the basic rules of derivatives are applied (e.g., power rule, chain rule, etc.). Then, the result is sent back to the browser and displayed in the answer box.


