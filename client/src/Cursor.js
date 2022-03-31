import { useEffect, useRef } from "react";
import './App.css';

const Cursor = () => {
    const delay = 2;

    const dot = useRef(null);
    const bottomShell = useRef(null);
    const topShell = useRef(null)

    const cursorVisible = useRef(true);
    const cursorEnlarged = useRef(false);

    const endX = useRef(window.innerWidth / 2);
    const endY = useRef(window.innerHeight / 2);
    const _x = useRef(0);
    const _y = useRef(0);

    const requestRef = useRef(null);

    useEffect(() => {
        const mouseOverEvent = () => {
            cursorEnlarged.current = true;
            toggleCursorSize();
        }
    
        const mouseOutEvent = () => {
            cursorEnlarged.current = false;
            toggleCursorSize();
        }
    
        const mouseEnterEvent = () => {
            cursorVisible.current = true;
            toggleCursorVisibility();
        }
    
        const mouseLeaveEvent = () => {
            cursorVisible.current = false;
            toggleCursorVisibility();
        }
    
        const mouseMoveEvent = e => {
            cursorVisible.current = true;
            toggleCursorVisibility();
    
            endX.current = e.pageX;
            endY.current = e.pageY;  
    
            dot.current.style.top = endY.current + 'px';
            dot.current.style.left = endX.current + 'px';
        }
    
        const animateShell = () => {
            _x.current += (endX.current - _x.current) / delay;
            _y.current += (endY.current - _y.current) / delay;
    
            bottomShell.current.style.top = _y.current - 10 + 'px';
            bottomShell.current.style.left = _x.current + 'px';
    
            topShell.current.style.top = _y.current + 10 + 'px';
            topShell.current.style.left = _x.current  + 'px';
    
            requestRef.current = requestAnimationFrame(animateShell);
        }

        document.addEventListener('mousedown', mouseOverEvent);
        document.addEventListener('mouseup', mouseOutEvent);
        document.addEventListener('mousemove', mouseMoveEvent);
        document.addEventListener('mouseenter', mouseEnterEvent);
        document.addEventListener('mouseleave', mouseLeaveEvent);

        animateShell();

        return () => {
            document.removeEventListener('mousedown', mouseOverEvent);
            document.removeEventListener('mouseup', mouseOutEvent);
            document.removeEventListener('mousemove', mouseMoveEvent);
            document.removeEventListener('mouseenter', mouseEnterEvent);
            document.removeEventListener('mouseleave', mouseLeaveEvent);

            cancelAnimationFrame(requestRef.current);
        }
    }, [])

    const toggleCursorVisibility = () => {
        if(cursorVisible.current) {
            dot.current.style.opacity = 1;
            bottomShell.current.style.opacity = 1;
            topShell.current.style.opacity = 1;
        } else {
            dot.current.style.opacity = 0;
            bottomShell.current.style.opacity = 0;
            topShell.current.style.opacity = 0;
        }
    }

    const toggleCursorSize = () => {
        if(cursorEnlarged.current){
            dot.current.style.transform = 'translate(-50%, -50%) scale(0.75)';
            bottomShell.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
            topShell.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            dot.current.style.transform = 'translate(-50%, -50%) scale(1)';
            bottomShell.current.style.transform = 'translate(-50%, -50%) scale(1)';
            topShell.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }


    return (
        <>
        <div ref={bottomShell} className="cursor-bottom-shell"></div>
        <div ref={topShell} className="cursor-top-shell"></div>
        <div ref={dot} className="cursor-dot"></div>
        </>
    );
}

export default Cursor;