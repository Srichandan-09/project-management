import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";

import Button from "./Button.jsx";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {

  const dialoge = useRef();

  useImperativeHandle(ref, () => {
    return {
        open() {
            dialoge.current.showModal();
        }
    }
  })

  return createPortal(
    <dialog ref={dialoge} className="p-4 rounded-md shadow-md backdrop:bg-stone-900/90">
        {children}
        <form method="dialog" className="mt-4 text-right">
            <Button>{buttonCaption}</Button>
        </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
