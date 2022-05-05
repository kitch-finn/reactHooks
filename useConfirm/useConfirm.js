// useConfirm - confirm 창이 뜨는 이벤트, 상황에 따라 다른 이벤트 부여 가능 //
export const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") return;
  if (onCancel && typeof onCancel !== "function") return;
  const confirmAction = () => {
    if (confirm(message)) {
      onConfirm();
    } else onCancel();
  };
  return confirmAction;
};
