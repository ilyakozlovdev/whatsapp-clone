import React, {ReactElement, useEffect, useRef, useState} from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./slider.scss";

interface SliderProps {
  onClose?: () => void;
  isOpen?: boolean;
  title: string;
  children?: React.ReactNode;
}

export function Slider({onClose, isOpen, title, children}: SliderProps): ReactElement {
  const [isClosing, setIsClosing] = useState(false);
  const sliderEl = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen === true && sliderEl.current instanceof HTMLElement) {
      sliderEl.current.focus();
    }
  }, [isOpen]);

  function handleClose() {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
    }, 250);

    onClose();
  }

  return (
    <div
      className={`slider ${isOpen ? "slider_open" : "slider_close"} ${
        isClosing ? "slider_closing" : ""
      }`}
      tabIndex={0}
      ref={sliderEl}
    >
      <div className="slider__header">
        <div className="slider__control-wrapper">
          <div className="slider__header-button" onClick={handleClose}>
            <ArrowBackIcon style={{color: "white"}} />
          </div>
          <div className="slider__header-title">{title}</div>
        </div>
      </div>
      <div className="slider__body">{isOpen && children}</div>
    </div>
  );
}
