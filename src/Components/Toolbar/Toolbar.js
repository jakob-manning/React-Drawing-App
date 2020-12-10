import Draggable from "react-draggable";
import React from "react";
import Tools from "./Tools/Tools";
import classes from "./Toolbar.module.css"

class Toolbar extends React.Component {
    render() {
        let header = (
            <div className={classes.clickable} onClick={this.props.toolbarClickHandler}>
                <i className={this.props.show ?[classes.minus] : [classes.arrow,classes.down].join(' ')}></i>
            </div>
        )

        let content = []
        let inlineStyle = {}
        if(this.props.show){
            content =(
                <div>
                    {this.props.children}
                </div>
            )
            inlineStyle = {opacity: 0.9}
        }

        return (
            <Draggable
                handle=".handle"
                axis={"x"}
                cancel=".content"
                bounds={"parent"}
                // defaultPosition={{x: 0, y: 0}}
                position={null}
                // grid={[25, 25]}
                scale={1}>
                <div style={inlineStyle} className={[classes.Toolbar, classes.Handle, "handle"].join(' ')}>
                    {header}
                    <div className={[classes.tools, "content"].join(' ')}>
                        {content}
                    </div>
                </div>
            </Draggable>
        )
    }
}


export default Toolbar
