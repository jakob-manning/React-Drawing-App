import React from 'react'
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";
import classes from './SaveMenu.module.css'

function SaveMenu(props) {
    let content = (
        <Auxiliary>
            <h3>Save This Beautiful Creation for Posterity</h3>
            <input className={classes.input}
                   placeholder={"title"}
                   value={props.title}
                   name={"title"}
                   type={"text"}
                   onChange={(event) => props.change (event)}
            />
            <br/>
            <Button click={props.submit}>Save</Button>
        </Auxiliary>
    )

    if(props.saved){
        content = <p>Saved!</p>
    }

    return (
        content
    )
}

export default SaveMenu