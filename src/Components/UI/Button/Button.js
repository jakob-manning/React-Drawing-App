import React from 'react'
import classes from './Button.module.css'

const Button = (props) => {


    let specialClasses = []
    if (props.selected){
        specialClasses = classes.selected
    }

    return (
        <button onClick={props.click} className={[classes.Button, specialClasses].join(' ')}>{props.children}</button>
    )
}

export default Button