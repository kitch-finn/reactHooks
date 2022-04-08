import React from "react";
import "./styles.css";
import { useState } from "react";
import ReactDOM from "react-dom";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

export default function App() {
  const maxLen = (value) => !value.includes("@");
  const name = useInput("Mr.", maxLen);

  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  return (
    <div className="App">
      <h1>Hello {item}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={incrementItem}> increment </button>
      <button onClick={decrementItem}> decrement </button>
      <br />
      <input placeholder="Name" {...name} />
    </div>
  );
}
// class this.state start here
// class AppUgly extends React.Component{
//   state = {
//     item: 1
//   }
//   render() {
//     const { item } = this.state;
//     return (
//       <div className="App">
//         <h1>Hello {item} </h1>
//         <h2>Start editing to see some magic happen!</h2>
//         <button onClick={this.incrementItem}> increment </button>
//         <button onClick={this.decrementItem}> decrement </button>

//       </div>
//     );
//   }
//   incrementItem = () => {
//     this.setState(state => {
//     return {
//       item: state.item + 1
//     }
//   })}
//   decrementItem = () => {
//     this.setState(state => {
//     return {
//       item: state.item - 1
//     }
//   })}
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<AppUgly />, rootElement);
