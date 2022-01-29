export const render = `
  import _React from "react";
  import _ReactDOM from "react-dom";

  function isJSXElement(element) {
    return element && element.$$typeof && element.$$typeof.toString() === 'Symbol(react.element)';
  }

  var render = (element) => {
    if(typeof element === "string") {
      document.getElementById("root").innerHTML = element;
    }
    else if(typeof element === "object") {
      if(isJSXElement(element)) {
        _ReactDOM.render(element, document.getElementById("root"));
      }
      else {
        document.getElementById("root").innerHTML = JSON.stringify(element, null, 2);
      }
    }
  }
`;

export const renderNoOp = `var render = () => { }`;
