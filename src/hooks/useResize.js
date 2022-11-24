import {useContext, useRef} from "react";
import NoteContext from "../contexts/NoteContext";

export const useResize = ({ note}) =>  {

    const isResizing = useRef(false);
    const resizeDirection = useRef(null);
    const pos = useRef({...note});
    const movement = useRef({});
    const {resizeNote}=useContext(NoteContext)



    const {x,y,width,height} = note;

    const resizeTop = () => {
        pos.current.top = y - (y-movement.current.y);
        pos.current.height = height + (y - pos.current.top);
    };

    const resizeRight = () => {
        pos.current.width = width + movement.current.x - (x+width);
    };

    const resizeBottom = () => {
        pos.current.height = height + movement.current.y - (y+height);
    };

    const resizeLeft = () => {
        pos.current.left = x - (x-movement.current.x);
        pos.current.width = width + (x-pos.current.left);
    };

    function onMouseMove(e) {
        if(!isResizing.current) return;
        movement.current.x = e.x;
        movement.current.y = e.y;
        pos.current.left = x;
        pos.current.top = y;

        const xPol = e.movementX/(Math.abs(e.movementX) || 1)
        const yPol = e.movementY/(Math.abs(e.movementY) || 1)

        movement.current.movementX = e.x * xPol;
        movement.current.movementY = e.y * yPol;
        switch(resizeDirection.current) {
            case 'top':
                resizeTop();
                break;
            case 'top-left':
                resizeTop();
                resizeLeft();
                break;
            case 'top-right':
                resizeTop();
                resizeRight();
                break;
            case 'right':
                resizeRight();
                break;
            case 'right-bottom':
                resizeBottom();
                resizeRight();
                break;
            case 'bottom':
                resizeBottom();
                break;
            case 'bottom-left':
                resizeBottom();
                resizeLeft();
                break;
            case 'left':
                resizeLeft();
                break;
            default:
                return;
        }

        resizeNote(note.id, pos.current.left, pos.current.top, pos.current.width, pos.current.height)
        e.stopPropagation();
        e.preventDefault();
    }


    function onMouseUp(e) {
        isResizing.current = false;
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
        e.stopPropagation();
        e.preventDefault();
    }

    function initResize(event) {
        const {dir} = event.target.dataset;
        event.stopPropagation();
        event.preventDefault();
        isResizing.current = true;
        resizeDirection.current = dir;
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp);
    }

    return [initResize];
}
