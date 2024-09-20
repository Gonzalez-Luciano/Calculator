let history = document.getElementById("history");
let input = document.getElementById("calcuText");
let buttons = document.querySelectorAll("button");
let specialKeys = ["+", "-", "*", "/", "%", "^", "√"];

let string = "";
let operator = "";
let firstOperand = "";
let secondOperand = "";

input.addEventListener("keydown", (e) => {
  if (!/[\d+\-*/%=^√.]/.test(e.key) && e.key !== "Backspace") {
    e.preventDefault();
  } else {
    let value = e.key; // Valor de la tecla presionada
    console.log(value);

    // Si la tecla presionada es '=', realiza la operación
    if (value === "=") {
      e.preventDefault();
      if (string[0] === "√") {
        firstOperand = string.slice(1);
        operator = "√";
        let result = calculateSingle(firstOperand, operator);
        string = result;
        input.value = string;
        firstOperand = "";
        operator = "";
        history.innerHTML = `${result}`;
      } else {
        secondOperand = string;
        // Convertir resultado a string asi no da error la funcion substring
        let result = calculate(firstOperand, secondOperand, operator) + "";
        string = result;
        input.value = string;
        firstOperand = "";
        operator = "";
        history.innerHTML = `${result} ${operator}`;
        console.log("igual: " + string);
      }
    }
    // Si es 'AC', limpiar todo
    else if (value == "AC") {
      string = "";
      operator = "";
      firstOperand = "";
      secondOperand = "";
      input.value = "";
      history.innerHTML = "";
    }
    // Si es 'DEL', elimina el último carácter
    else if (value === "Backspace") {
      string = string.substring(0, string.length - 1);
    }
    // Si es un operador (+, -, *, /, %), almacena el primer número y el operador
    else if (specialKeys.includes(value)) {
      e.preventDefault();
      if (string !== "") {
        if (string === "-" && specialKeys.includes(value)) {
          e.preventDefault();
        } else if (string.includes("√")) {
          firstOperand = string.slice(1);
          operator = "√";
          let result = calculateSingle(firstOperand, operator);
          firstOperand = result;
          operator = value;
          history.innerHTML = `${result} ${operator}`;
          input.value = "";
          string = "";
        } else if (operator.length > 0) {
          secondOperand = string;
          // Caso especial %
          if (value === "%") {
            let result = calculate(firstOperand, secondOperand, value) + "";
            input.value = result;
            string = result;
            history.innerHTML = `${firstOperand} ${operator} ${result}`;
          } else {
            let result = calculate(firstOperand, secondOperand, operator) + "";
            input.value = "";
            string = "";
            firstOperand = result;
            operator = value;
            history.innerHTML = `${result} ${operator}`;
          }
        } else {
          firstOperand = string;
          operator = value;
          string = "";
          input.value = "";
          history.innerHTML = `${firstOperand} ${operator}`;
        }
      } else if (value === "-") {
        // Si el valor es "-", lo tratamos como un número negativo
        if (string === "") {
          string += "-"; // Agregar el signo negativo a la cadena del primer operando
          input.value = string; // Mostrar el número negativo en el input
        } else {
          // Si ya hay un operador, entonces se trata del segundo operando
          operator = value;
          history.innerHTML = `${firstOperand} ${operator}`;
        }
      }
    }
    // Si es un número, sigue agregando al string
    else {
      string += value;
      console.log("agregado: " + string);
    }
  }
});

// Convertir la lista de botones en un array y agregar eventos a cada botón
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.innerHTML; // Valor del botón presionado
    console.log(value);

    // Si el botón presionado es '=', realiza la operación
    if (value === "=") {
      if (string[0] === "√") {
        firstOperand = string.slice(1);
        operator = "√";
        let result = calculateSingle(firstOperand, operator);
        string = result;
        input.value = string;
        firstOperand = "";
        operator = "";
        history.innerHTML = `${result}`;
      } else {
        secondOperand = string;
        // Convertir resultado a string asi no da error la funcion substring
        let result = calculate(firstOperand, secondOperand, operator) + "";
        string = result;
        input.value = string;
        firstOperand = "";
        operator = "";
        history.innerHTML = `${result} ${operator}`;
        console.log("igual: " + string);
      }
    }
    // Si es 'AC', limpiar todo
    else if (value == "AC") {
      string = "";
      operator = "";
      firstOperand = "";
      secondOperand = "";
      input.value = "";
      history.innerHTML = "";
    }
    // Si es 'DEL', elimina el último carácter
    else if (value == "DEL") {
      string = string.substring(0, string.length - 1);
      input.value = string;
    }
    // Si es un operador (+, -, *, /, %), almacena el primer número y el operador
    else if (specialKeys.includes(value)) {
      if (string !== "") {
        if (string === "-" || (string === "√" && specialKeys.includes(value))) {
          e.preventDefault();
        } else if (string.includes("√")) {
          firstOperand = string.slice(1);
          operator = "√";
          let result = calculateSingle(firstOperand, operator);
          firstOperand = result;
          operator = value;
          history.innerHTML = `${result} ${operator}`;
          input.value = "";
          string = "";
        } else if (operator.length > 0) {
          secondOperand = string;
          // Caso especial %
          if (value === "%") {
            let result = calculate(firstOperand, secondOperand, value) + "";
            input.value = result;
            string = result;
            history.innerHTML = `${firstOperand} ${operator} ${result}`;
          } else {
            let result = calculate(firstOperand, secondOperand, operator) + "";
            input.value = "";
            string = "";
            firstOperand = result;
            operator = value;
            history.innerHTML = `${result} ${operator}`;
          }
        } else {
          firstOperand = string;
          operator = value;
          string = "";
          history.innerHTML = `${firstOperand} ${operator}`;
        }
      } else if (value === "-" || value === "√") {
        // Si el valor es "-", lo tratamos como un número negativo
        if (string === "") {
          string += value; // Agregar el signo negativo a la cadena del primer operando
          input.value = string; // Mostrar el número negativo en el input
        } else {
          // Si ya hay un operador, entonces se trata del segundo operando
          operator = value;
          history.innerHTML = `${firstOperand} ${operator}`;
        }
      }
    }
    // Si es un número, sigue agregando al string
    else {
      string += value;
      input.value = string;
      console.log("agregado: " + string);
    }
  });
});

// Función para realizar la operación matemática
function calculateSingle(num, operator) {
  console.log(num + operator);
  let result;
  let first = parseFloat(num);
  switch (operator) {
    case "√":
      result = Math.pow(first, 0.5);
      break;
    default:
      result = "Error";
  }
  return result;
}
function calculate(num1, num2, operator) {
  let result;
  let first = parseFloat(num1);
  let second = parseFloat(num2);

  switch (operator) {
    case "+":
      result = first + second;
      break;
    case "-":
      result = first - second;
      break;
    case "*":
      result = first * second;
      break;
    case "/":
      result = first / second;
      break;
    case "%":
      result = first * (second / 100);
      break;
    case "^":
      result = Math.pow(first, second);
      break;
    default:
      result = "Error"; // Si no hay un operador válido
  }
  return result;
}
