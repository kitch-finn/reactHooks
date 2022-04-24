import React, { useRef } from "react";
import "./styles.css";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

///// useFullscreen -  //////
const useFullscreen = (callback) => {
  const element = useRef();
  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen();
      if (callback && typeof callback === "function") {
        callback(true);
      }
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
    if (callback && typeof callback === "function") {
      callback(false);
    }
  };
  return { element, triggerFull, exitFull };
};

///// useScroll - 특정 scrollY 좌표를 넘어갔을 때 이벤트 발생 //////
const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0
  });
  const onScroll = (event) => {
    setState({ y: window.scrollY, x: window.scrollX });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });
  return state;
};

///// useNetwork - navigator on 또는 offline이 되는 것을 막아줌 //////
const useNetwork = (onChange) => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatus(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);
  return status;
};

//////////// useFadeIn - 컨텐츠를 서서히 fade in 시키기 ////////////
const useFadeIn = (duration = 1, delay = 0) => {
  if (typeof duration !== "number" || typeof delay !== "number") return;
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};

//// useBeforeLeave - 마우스가 브라우저 밖으로 나갔을 때 이벤트 동작 ////
const useBeforeLeave = (onBefore) => {
  if (typeof onBefore !== "function") return;
  // 마우스포인트의 좌표에 따라 호출되는 이벤트 (이 경우, 브라우저의 윗 부분)
  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
};

////// usePreventLeave - 탭 또는 창을 닫을 때 이밴트 동작 //////
const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
};

// useConfirm - confirm 창이 뜨는 이벤트, 상황에 따라 다른 이벤트 부여 가능 //
const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") return;
  if (onCancel && typeof onCancel !== "function") return;
  const confirmAction = () => {
    if (confirm(message)) {
      onConfirm();
    } else onCancel();
  };
  return confirmAction;
};

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
//////////////////////useTitle///////////////////////////
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};
///////////////// useTabs - 탭에 따라 바뀌는 랜더링 ///////////////
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
/////////////// useInput - input창에 조건 추가하기 //////////////////
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
  // useFullscreen
  const onFullS = (isFull) => {
    console.log(isFull ? "We are full" : "We are small");
  };
  const { element, triggerFull, exitFull } = useFullscreen(onFullS);

  // useScroll
  const { y } = useScroll();

  // useNetwork
  const handleNerworkChange = (online) =>
    console.log(online ? "We just went online" : "We are offline");
  const onLine = useNetwork(handleNerworkChange);

  // useFadeIn
  const fadeInH2 = useFadeIn(1, 2);
  const fadeInP = useFadeIn(2, 4);

  // useBeforeLeave
  const begForLife = () => console.log("Please, Don't leave");
  useBeforeLeave(begForLife);

  // usePreventLeave
  const { enablePrevent, disablePrevent } = usePreventLeave();

  // useConfirm
  const deleteWorld = () => console.log("Deleting the World...");
  const cancel = () => console.log("aborted");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, cancel);

  // useRef & useClick
  const Hello = () => console.log("Click Title");
  const title = useClick(Hello);

  // useTitle code here
  const titleUpdater = useTitle("Loading...");
  setTimeout(() => {
    titleUpdater("Home");
  }, 3000);

  // useTabs code here
  const { currentItem, changeItem } = useTabs(0, content);

  // useInput code here
  const noAtSign = (value) => !value.includes("@");
  const maxLen = (value) => value.length <= 10;
  const name = useInput("less11", maxLen);
  const sign = useInput("noAtSign", noAtSign);

  // useState code here
  const [item, setItem] = useState(0);
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
      <button onClick={confirmDelete}>Delete the World</button>
      <div>useConfirm</div>
      <br />
      <div> usePreventLeave buttons </div>
      <div>
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>Unprotect</button>
      </div>
      <br />
      <h2 {...fadeInH2}>useFadeIn-h2</h2>
      <p {...fadeInP}>useFadeIn-p</p>
      <br />
      <h2>{onLine ? "online" : "offline"}</h2>
      <br />
      <div ref={element}>
        <img src="https://i.ibb.co/R6RwNxx/grape.jpg" alt="grape" width="250" />
        <br />
        <button onClick={triggerFull}>Make Fullscreen</button>
        <button onClick={exitFull}>Exit Fullscreen</button>
      </div>
      <br />
      <div style={{ height: "500vh" }}>
        <h2 style={{ color: y > 400 ? "red" : "blue" }}>useScroll</h2>
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
