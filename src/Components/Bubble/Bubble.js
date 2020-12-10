import React from 'react'
import classes from './Bubble.module.css'

const Bubble = (props) => {
    let myStyle = {
        flexFlow: props.type,
        backgroundColor: props.color,
        padding: props.padding,
        margin: props.margin,
        borderRadius: props.radius,
        borderWidth: props.border,
    }

    return (
        <div
            className={classes.Bubble}
            onClick={props.click}
            style={myStyle}
            onContextMenu={props.click}
            onAuxClick={props.onMiddleClick}
            // onMouseLeave={props.enter}
        >{props.children}</div>
    )
}

export default Bubble