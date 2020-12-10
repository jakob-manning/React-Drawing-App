import React from "react";
import classes from "./MobileButtons.module.css"
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

class MobileButtons extends React.Component {

    render() {

        let button1Selected = [this.props.primaryClick ? classes.selected : null]
        let button2Selected = [!this.props.primaryClick ? classes.selected : null]

        return (
            <Auxiliary>
                <div onClick={this.props.secondaryClickHandler}
                     className={[classes.MobileButton, button2Selected].join(' ')}>|</div>
                <div onClick={this.props.primaryClickHandler}
                     className={[classes.MobileButton,classes.MobileButton1, button1Selected].join(' ') }>|</div>
            </Auxiliary>
        )
    }
}


export default MobileButtons
