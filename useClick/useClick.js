import { useRef, useEffect } from "react";

/////////////useRef, useClick///////////////////////
export const useClick = (onClick) => {
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
