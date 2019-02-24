let calc_body = document.querySelector(".calc-body");
let input = document.querySelector("input");
let buttons = document.querySelectorAll("button")

//storage
let firstValue = "";
let operator = "";
let secondValue = "";
let extraValue = "";

//listen for keypresses
window.addEventListener("click", knowWhat);
function knowWhat(e) {
    const key = e.target;
    let keyContent = key.textContent;
    let display = input.value;
    const action = key.getAttribute("data-action");
    let previousKeyType = calc_body.getAttribute("data-prevkey");
    if (!action) return;
    //when a number button is clicked
    if (action === "1" || action === "2" || action === "3" ||
        action === "4" || action === "5" || action === "6" ||
        action === "7" || action === "8" || action === "9" ||
        action === "0" || action === "00") {
            if(display === "0" || previousKeyType === "operator" || previousKeyType === "calculate") {
                input.value = keyContent;
            } else {
                input.value = display + keyContent;
            }
            calc_body.setAttribute("data-prevkey", "number");
    }
    if (action === "divide" ||
        action === "multiply" ||
        action === "minus" ||
        action === "add") {
        
        //create a custom variable to store the operator & first input.
        firstValue = input.value;
        operator = action;

        //note the key being pressed
        calc_body.setAttribute("data-prevkey", "operator");
        calc_body.setAttribute("operator", action);
        }
    //handles the clear button
    if(action === "clear") {
        if (key.textContent === "AC"){
            firstValue = "";
            secondValue = "";
            operator = "";
            extraValue = "";
            calc_body.setAttribute("data-prevkey", "");
        } else {
            key.textContent = "AC";
        }
        input.value = "0";
        calc_body.setAttribute("data-prevkey", "clear");
    }
    if(action !== "clear") {
        let clearButton = calc_body.querySelector("[data-action=clear]");
        clearButton.textContent = "CE";
    }
    //delete button to reduce length of display by one
    if(action === "delete") {
        console.log("delete key");
        if (input.value === "Error") {
            input.value = "0";
        }
        input.value = input.value.slice(0, input.value.length - 1);
        if(input.value.length === 0){
            input.value = "0";
        }
    }
    //handles the actual calculation
    if(action === "calculate") {
        secondValue = input.value;
        if (firstValue) {
            //pressing the equals multiple times is handled
            if(previousKeyType === "calculate") {
                firstValue = input.value;
                secondValue = extraValue;
            }
            input.value = calculate(firstValue, operator, secondValue);
        }
        extraValue = secondValue;
        console.log(extraValue);
        //note the key being pressed.
        calc_body.setAttribute("data-prevkey", "calculate");
    }
    //handles the percentage of any number
    if(action === "percent") {
        console.log("percent key");
        input.value = parseFloat(input.value) / 100; 
    }
    //includes a decimal
    if(action === "decimal") {
        //ensures no decimal already exists
        if (!display.includes(".")){
            input.value = display + ".";
        }
        //adding a decimal immediately after an equal sign
        if (previousKeyType === "operator" || previousKeyType === "calculate"){
            input.value = "0.";
        }
        calc_body.setAttribute("data-prevkey", "decimal");
    }
}

//calculator function
function calculate(x, operator, y) {
    let x1 = parseFloat(x);
    let y1 = parseFloat(y);
    if (operator === "add"){
        return x1 + y1;
    } else if (operator === "minus") {
        return x1 - y1;
    } else if (operator === "multiply") {
        return x1 * y1;
    } else if (operator === "divide") {
        if (y1 === 0){
            return "Error"
        } else {
            return x1 / y1;
        }
        
    }
}