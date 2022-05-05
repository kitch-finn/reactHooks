import { useState, useEffect } from "react";

//// useBeforeLeave - 마우스가 브라우저 밖으로 나갔을 때 이벤트 동작 ////
export const useBeforeLeave = (onBefore) => {
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
