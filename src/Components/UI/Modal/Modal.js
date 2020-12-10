import React from 'react'
import classes from './Modal.module.css'
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";


class Modal extends React.Component {

    render() {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} backgroundClick={this.props.backgroundClick}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '.9' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal