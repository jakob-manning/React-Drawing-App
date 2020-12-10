import React from 'react'
import classes from './ToggleButton.module.css'

const DrawerToggle = (props) => (
    <div onClick={props.opened} className={classes.ToggleButton}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default DrawerToggle