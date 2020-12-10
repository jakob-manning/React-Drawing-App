import React from 'react'
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import classes from './LoadMenu.module.css'
import Button from "../../UI/Button/Button";
import {connect} from "react-redux";
import {UPDATE_BOOLEAN, UPDATE_OBJECT} from "../../../store/actions";

class LoadMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    loadDataHandler = (data) => {
        if(data.css){
            let padding = data.css.padding ? data.css.padding : 0
            let margin = data.css.margin ? data.css.margin : 0
            let radius = data.css.radius? data.css.radius : 0
            let border = data.css.border ? data.css.border : 0
            this.props.updateStore(UPDATE_OBJECT, {state:"padding", value:padding})
            this.props.updateStore(UPDATE_OBJECT, {state:"margin", value:margin})
            this.props.updateStore(UPDATE_OBJECT, {state:"radius", value:radius})
            this.props.updateStore(UPDATE_OBJECT, {state:"border", value:border})
        }
        else {
            this.props.updateStore(UPDATE_OBJECT, {state:"padding", value:0})
            this.props.updateStore(UPDATE_OBJECT, {state:"margin", value:0})
            this.props.updateStore(UPDATE_OBJECT, {state:"radius", value:0})
            this.props.updateStore(UPDATE_OBJECT, {state:"border", value:0})
        }
        this.props.updateStore(UPDATE_OBJECT, {state:"newBubbleStructure", value:data.structure})
        this.props.updateStore(UPDATE_BOOLEAN, {state:'newDataToLoad', value:true})
    }

    render() {
        let error = []
        let networkData = this.props.networkData
        if(this.props.error){
            error = <p>"network error, please try again"</p>
        }
        let artWorks = []
        if(networkData){
            for(let item in networkData){
                artWorks.push(
                    <div className={classes.loadItem} key={item} onClick={() => this.loadDataHandler(networkData[item])}>
                        {networkData[item].title}
                    </div>
                )
            }
        }


        return (
            <Auxiliary>
                <h3>Load a Work of Art</h3>
                {this.props.error}
                <br/>
                {artWorks}
            </Auxiliary>
        )
    }
}

// state to props
const mapStateToProps = state => {
    return {
        bubbleStructure: state.bubbleStructure
    }
}

// action dispatches (listeners)
const mapDispatchToProps = dispatch => {
    return {
        updateStore: (type, payload) => dispatch({type, payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadMenu)