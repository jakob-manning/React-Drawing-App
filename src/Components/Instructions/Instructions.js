import React from 'react'
import classes from './Instructions.module.css'

const Instructions = (props) => {

    return (
        <div className={classes.Instructions}>
            <div>Left click: split horizontally</div>
            <div>Right click: split vertically</div>
            <div>Middle click: delete box</div>
        </div>
    )
}

export default Instructions