import React from 'react'
import classes from './Wrapper.module.css'

const Wrapper = (props) => {

    return (
        <div className={classes.Wrapper}>
            {props.children}
        </div>
    )
}

export default Wrapper