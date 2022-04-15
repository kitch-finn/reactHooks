import React, { useRef } from "react";
import "./styles.css";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

/////////////useRef, useClick///////////////////////
const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const element = useRef();
  useEffect(() => {
    // element.current가 마운트 되면 이벤트를 추가하고, 작동
    // componentDidMount, DidUpdate일 때 호출
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    // componentWillUnMount 될 때 호출
    // component가 mount되지 않았을 때에는 EventListener가 없어야 하므로
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  // dependency []가 존재하면 componentDidMount 일 때 작동
  return element;
};
//////////////////////////////////////////////////////
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};
//////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////
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
  // useRef
  const Hello = () => console.log("hello");
  const title = useClick(Hello);

  // useTitle code here
  const titleUpdater = useTitle("Loading...");
  setTimeout(() => {
    titleUpdater("Home");
  }, 5000);

  // useTabs code here
  const { currentItem, changeItem } = useTabs(0, content);

  // useInput code here
  const noAtSign = (value) => !value.includes("@");
  const maxLen = (value) => value.length <= 10;
  const name = useInput("less11", maxLen);
  const sign = useInput("noAtSign", noAtSign);

  // useState code here
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  // useEffect start
  const sayHello = () => console.log("Hello");
  useEffect(() => {
    sayHello();
  }, [item]);
  // useEffect end

  return (
    <div className="App">
      <h1 ref={title}>Click and check console</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h3>State is Here {item /* useState code start here */}</h3>
      <button onClick={incrementItem}> increment </button>
      <button onClick={decrementItem}> decrement </button>
      {/* useState code end */}
      <br />
      <br />
      <input placeholder="less11" {...name} /* useInput here */ />
      <input placeholder="noAtSign" {...sign} /* useInput here */ />
      <br />
      <br />
      {/* useTabs code start here */}
      <div>
        {content.map((section, index) => (
          <button onClick={() => changeItem(index)} key={index}>
            {section.tab}
          </button>
        ))}
        <div>{currentItem.content}</div>
      </div>
      {/* useTabs code end */}
      <br />
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
