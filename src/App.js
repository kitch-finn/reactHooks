import React from "react";
import "./styles.css";
import { useState } from "react";
import ReactDOM from "react-dom";

const content = [
  {
    tab: "Section 1",
    content: "This is content of useTabs Section 1"
  },
  {
    tab: "Section 2",
    content: "This is content of useTabs Section 2"
  }
];
const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  };
};

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
  const { currentItem, changeItem } = useTabs(0, content);
  // useInput code start here
  const maxLen = (value) => !value.includes("@");
  const name = useInput("useInput", maxLen);
  // useInput end

  // useState code start here
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);
  // useState end

  return (
    <div className="App">
      <h1>State is Here {item}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={incrementItem}> increment </button>
      <button onClick={decrementItem}> decrement </button>
      <br />
      <br />
      <input placeholder="Name" {...name} /* useInput here */ />
      <br />
      <br />
      <div>
        {content.map((section, index) => (
          <button onClick={() => changeItem(index)} key={index}>
            {section.tab}
          </button>
        ))}
        <div>{currentItem.content}</div>
      </div>
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
