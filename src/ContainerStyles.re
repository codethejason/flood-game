let reasonReactBlue = "#48a9dc";
let radius = "4px";

let style = {j|
  body {
    background-color: rgb(224, 226, 229);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input[type=number] {
    padding: 8px;
    margin: 1px 10px 1px 0px;
  }
  button {
    background-color: white;
    color: $reasonReactBlue;
    box-shadow: 0 0 0 1px $reasonReactBlue;
    border: none;
    padding: 8px;
    font-size: 16px;
    cursor: pointer;
  }
  button:active {
    background-color: $reasonReactBlue;
    color: white;
  }
  .container {
    margin: 12px 0px;
    box-shadow: 0px 4px 16px rgb(200, 200, 200);
    border-radius: $radius;
    font-family: sans-serif;
  }
  .containerTitle {
    background-color: rgb(242, 243, 245);
    padding: 12px;
    font-weight: bold;
    border-radius: $radius $radius 0 0;
    text-align: center;
    font-size: 24px;
  }
  .containerContent {
    background-color: white;
    padding: 16px;
    border-radius: 0 0 $radius $radius;
  }
|j};
