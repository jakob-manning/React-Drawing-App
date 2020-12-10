import React from 'react'
import classes from './Tools.Module.css'
import {connect} from "react-redux";
import {GRAY_SCALE, UPDATE_BOOLEAN, UPDATE_STRING, UPDATE_VALUE} from "../../../store/actions";
import paintIcon from '../../../assets/images/paintIcon.png'
import Button from "../../UI/Button/Button";

class Tools extends React.Component {
    constructor() {
        super();
        this.state = {
            padding: "0",
            margin: "0",
            radius: "0",
            border: "0",
            color: "FFFFFF",
            boxCreator: true,
            paintBucket: false,
        }
    }

    changeHandler  = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })

        if(event.target.name === "color"){
            this.props.updateStore(UPDATE_STRING, {state:event.target.name, value:event.target.value})
            this.paintBucketClickHandler()
        }
        else {
            this.props.updateStore(UPDATE_VALUE, {state:event.target.name, value:event.target.value})
        }
    }

    grayScaleHandler = () => {
        this.props.updateStore(UPDATE_BOOLEAN, {state:'grayScale', value:true})
    }

    resetHandler = () => {
        this.props.updateStore(UPDATE_BOOLEAN, {state:'reset', value:true})
    }

    boxCreatorClickHandler = () => {
        this.setState({
            boxCreator: true,
            paintBucket: false,
        })
        this.props.updateStore(UPDATE_BOOLEAN, {state:'paintMode', value:false})
    }

    paintBucketClickHandler = () => {
        this.setState({
            boxCreator: false,
            paintBucket: true,
        })
        this.props.updateStore(UPDATE_BOOLEAN, {state:'paintMode', value:true})
    }

    render() {

        return (
            <div>
                <h3 className={classes.heading}>Options:</h3>
                <p className={classes.sliderName}>Radius</p>
                <input type="range" min="0" max="50"
                       value={this.props.radius}
                       className={classes.slider}
                       name="radius"
                       onChange={this.changeHandler}/>
                <p className={classes.sliderName}>Padding</p>
                <input type="range" min="0" max="30"
                       value={this.props.padding}
                       className={classes.slider}
                       name="padding"
                       onChange={this.changeHandler}/>
                <p className={classes.sliderName}>Margin</p>
                <input type="range" min="0" max="30"
                       value={this.props.margin}
                       className={classes.slider}
                       name="margin"
                       onChange={this.changeHandler}/>
                <p className={classes.sliderName}>Border</p>
                <input type="range" min="0" max="20"
                       value={this.props.border}
                       className={classes.slider}
                       name="border"
                       onChange={this.changeHandler}/>
                <div className={classes.moreMT}>
                    <Button click={this.grayScaleHandler}>Gray Scale</Button>
                </div>
                <h3 className={classes.heading}>Tools:</h3>
                <input type="color" id="head" name="color" value={this.state.color} className={classes.colorSelector} onChange={this.changeHandler} />
                <Button selected={this.state.boxCreator} click={this.boxCreatorClickHandler}>Box Creator</Button>
                <Button selected={this.state.paintBucket} click={this.paintBucketClickHandler}>Paint Bucket</Button>
                <br/>
                <h3 className={classes.heading}>Save/Load:</h3>
                <Button click={this.props.saveHandler}>Save</Button>
                <Button click={this.props.loadHandler}>Load</Button>
                <br/>
                <Button click={this.resetHandler}>Reset</Button>
            </div>
        )
    }
}

// state to props
const mapStateToProps = state => {
    return {
        padding: state.padding,
        margin: state.margin,
        radius: state.radius,
        border: state.border,
        color: state.color,
    }
}

// action dispatches (listeners)
const mapDispatchToProps = dispatch => {
    return {
        updateStore: (type, payload) => dispatch({type, payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools)