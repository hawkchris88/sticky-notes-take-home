import {useResize} from "../../hooks/useResize";
import "./style.css";

export const  ResizeableBorder = ({note}) =>{

    const [initResize] = useResize({note});

   return(
       <>
        <div data-dir={'top-left'} className="top-left" onMouseDown={initResize}/>
        <div data-dir={'top'} className="top" onMouseDown={initResize}/>
        <div data-dir={'top-right'} className="top-right" onMouseDown={initResize}/>
        <div data-dir ={'right'} className="right" onMouseDown={initResize}/>
        <div data-dir ={'right-bottom'} className="right-bottom"  onMouseDown={initResize}/>
        <div data-dir ={'bottom'} className="bottom" onMouseDown={initResize}/>
        <div data-dir ={'bottom-left'} className="bottom-left" onMouseDown={initResize}/>
        <div data-dir ={'left'} className="left" onMouseDown={initResize}/>
    </>);
}
