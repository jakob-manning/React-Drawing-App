import React from 'react'
import classes from './SideDrawer.module.css'
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
    let drawerDisplay = classes.Close
    if(props.show){
        drawerDisplay = classes.Open
    }

    return (
        <Auxiliary>
            <Backdrop
                show={props.show}
                backgroundClick={props.backgroundClick}
            />
            <div className={[classes.SideDrawer, drawerDisplay].join(' ')}>
                <div className={classes.Logo}>
                    {props.children}
                </div>
            </div>
        </Auxiliary>
    )
}

export default SideDrawer