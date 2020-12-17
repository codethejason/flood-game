'use strict';


var reasonReactBlue = "#48a9dc";

var radius = "4px";

var style = "\n  body {\n    background-color: rgb(224, 226, 229);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n  h2 {\n    font-size: 18px;\n  }\n  input[type=number] {\n    padding: 8px;\n    margin: 1px 10px 1px 0px;\n    width: 100px;\n  }\n  button {\n    background-color: white;\n    color: " + reasonReactBlue + ";\n    box-shadow: 0 0 0 1px " + reasonReactBlue + ";\n    border: none;\n    padding: 8px;\n    font-size: 16px;\n    cursor: pointer;\n  }\n  button:active {\n    background-color: " + reasonReactBlue + ";\n    color: white;\n  }\n  .container {\n    margin: 12px 0px;\n    box-shadow: 0px 4px 16px rgb(200, 200, 200);\n    border-radius: " + radius + ";\n    font-family: sans-serif;\n  }\n  .containerTitle {\n    background-color: rgb(242, 243, 245);\n    padding: 12px;\n    font-weight: bold;\n    border-radius: " + radius + " " + radius + " 0 0;\n    text-align: center;\n    font-size: 24px;\n  }\n  .containerContent {\n    background-color: white;\n    padding: 16px;\n    border-radius: 0 0 " + radius + " " + radius + ";\n  }\n";

exports.reasonReactBlue = reasonReactBlue;
exports.radius = radius;
exports.style = style;
/* No side effect */
