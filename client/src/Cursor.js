import { useEffect, useRef } from "react";
import "./cursor.css";

const Cursor = () => {
  const delay = 2;

  const dot = useRef(null);
  const bottomShell = useRef(null);
  const topShell = useRef(null);

  const cursorVisible = useRef(true);
  const cursorEnlarged = useRef(false);
  const cursorMode = useRef(false);

  const endX = useRef(window.innerWidth / 2);
  const endY = useRef(window.innerHeight / 2);
  const _x = useRef(0);
  const _y = useRef(0);

  const requestRef = useRef(null);

  useEffect(() => {
    toggleCursorSize();

    const mouseOverEvent = (event) => {
      var target = event.target || event.srcElement;
      if (target.className.includes("clickable")) {
        cursorMode.current = true;
        toggleCursorMode();
      }
    };

    const mouseOutEvent = (event) => {
      var target = event.target || event.srcElement;
      if (target.className.includes("clickable")) {
        cursorMode.current = false;
        toggleCursorMode();
      }
    };

    const mouseDownEvent = () => {
      cursorEnlarged.current = true;
      toggleCursorSize();
    };

    const mouseUpEvent = () => {
      cursorEnlarged.current = false;
      toggleCursorSize();
    };

    const mouseEnterEvent = () => {
      cursorVisible.current = true;
      toggleCursorVisibility();
    };

    const mouseLeaveEvent = () => {
      cursorVisible.current = false;
      toggleCursorVisibility();
    };

    const mouseMoveEvent = (e) => {
      cursorVisible.current = true;
      toggleCursorVisibility();

      endX.current = e.pageX;
      endY.current = e.pageY;

      dot.current.style.top = endY.current + "px";
      dot.current.style.left = endX.current + "px";
    };

    const animateShell = () => {
      _x.current += (endX.current - _x.current) / delay;
      _y.current += (endY.current - _y.current) / delay;

      bottomShell.current.style.top = _y.current - 10 + "px";
      bottomShell.current.style.left = _x.current + "px";

      topShell.current.style.top = _y.current + 10 + "px";
      topShell.current.style.left = _x.current + "px";

      requestRef.current = requestAnimationFrame(animateShell);
    };

    document.addEventListener("mousedown", mouseDownEvent);
    document.addEventListener("mouseup", mouseUpEvent);
    document.addEventListener("mousemove", mouseMoveEvent);
    document.addEventListener("mouseenter", mouseEnterEvent);
    document.addEventListener("mouseleave", mouseLeaveEvent);
    document.addEventListener("mouseover", mouseOverEvent);
    document.addEventListener("mouseout", mouseOutEvent);

    animateShell();

    return () => {
      document.removeEventListener("mousedown", mouseDownEvent);
      document.removeEventListener("mouseup", mouseUpEvent);
      document.removeEventListener("mousemove", mouseMoveEvent);
      document.removeEventListener("mouseenter", mouseEnterEvent);
      document.removeEventListener("mouseleave", mouseLeaveEvent);
      document.removeEventListener("mouseover", mouseOverEvent);
      document.removeEventListener("mouseout", mouseOutEvent);

      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const toggleCursorVisibility = () => {
    dot.current.style.display = "block";
    bottomShell.current.style.display = "block";
    topShell.current.style.display = "block";

    if (cursorVisible.current) {
      dot.current.style.opacity = 1;
      bottomShell.current.style.opacity = 1;
      topShell.current.style.opacity = 1;
    } else {
      dot.current.style.opacity = 0;
      bottomShell.current.style.opacity = 0;
      topShell.current.style.opacity = 0;
    }
  };

  //todo animation when click
  const toggleCursorSize = () => {
    if (cursorEnlarged.current) {
    } else {
    }
  };

  const toggleCursorMode = () => {
    if (cursorMode.current) {
      dot.current.style.background = "red";
    } else {
      dot.current.style.background = "white";
    }
  };

  return (
    <>
      <div ref={bottomShell} className="cursor-bottom-shell"></div>
      <div ref={topShell} className="cursor-top-shell"></div>
      <div ref={dot} className="cursor-dot"></div>
    </>
  );
};

export default Cursor;
