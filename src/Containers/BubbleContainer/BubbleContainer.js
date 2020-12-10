import React from 'react'
import classes from './BubbleContainer.module.css'
import Bubble from "../../Components/Bubble/Bubble";
import {connect} from "react-redux";
import {UPDATE_BOOLEAN, UPDATE_OBJECT, UPDATE_VALUE} from "../../store/actions";
import Instructions from "../../Components/Instructions/Instructions";

class BubbleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //TODO: fix bug in which some colours aren't hex values
            bubbleStructure: {
                0: {type: "row", children: null, color: this.randomColourGenerator()},
            },
            nextKey: 1,
            twoMouseButton: true,
            color: "#FFFFFF",
        }
    }

    bubbleGenerator = (key) => {
        let currentBubble = {...this.state.bubbleStructure[key]}
        if(!currentBubble.children){
            return (
                <Bubble key={key}
                        type={currentBubble.type}
                        click={(event) => this.clickHandler(key,event)}
                        onMiddleClick={(event) => this.onMiddleClick(key,event)}
                        enter={() => this.clickHandler(key)}
                        color={currentBubble.color}
                        padding={this.props.padding}
                        margin={this.props.margin}
                        radius={this.props.radius}
                        border={this.props.border}
                />
            )
        }
        else{
            let jsx = (<Bubble key={key}
                               type={currentBubble.type}
                               click={(event) => this.clickHandler(key,event)}
                               onMiddleClick={(event) => this.onMiddleClick(key,event)}
                               color={currentBubble.color}
                               padding={this.props.padding}
                               margin={this.props.margin}
                               radius={this.props.radius}
                               border={this.props.border}
            >
                {currentBubble.children.map( child => {
                    return (this.bubbleGenerator(child))
                })}
                </Bubble>)
            return(
                jsx
                )
        }
    }

    clickHandler = (key,event) => {
        event.preventDefault()
        event.stopPropagation()

        //calculate current bubble
        let currentBubble = {...this.state.bubbleStructure[key]}

        //Paint Mode
        if(this.props.paintMode){
            let color = this.props.color
            currentBubble.color = color

            //change color of selected div
            this.setState(prevState => {
                let bubbleStructure = {...prevState.bubbleStructure}
                bubbleStructure[key] = currentBubble
                return({
                    bubbleStructure
                })
            })
            //return and escape!
            return
        }


        //calculate type based on mouse button and mobile click mode
        let type="column"
        console.log(this.props.primaryClick)
        if(this.state.twoMouseButton === true){
            if(event.button === 2){
                type = "row"
            }
        }
        if(!this.props.primaryClick){
            type = "row"
        }

        //set state
        this.setState( prevState => {
            //update children of currentBubble
            let nextKey = prevState.nextKey
            currentBubble.children=[nextKey,nextKey+1]
            currentBubble.type=type

            let bubbleStructure = {...prevState.bubbleStructure}
            bubbleStructure[key] = currentBubble
            bubbleStructure[nextKey] = {type, children:null, color: this.randomColourGenerator()}
            bubbleStructure[nextKey + 1] = {type, children:null, color: this.randomColourGenerator()}
            nextKey = nextKey + 2
            return({
                    bubbleStructure,
                    nextKey
            })
        })
    }

    onMiddleClick = (key, event) => {
        event.preventDefault()
        event.stopPropagation()

        //catch middle mouse clicks
        if(event.button === 1){
            this.setState( prevState => {
                //Find bubble with active child and remove it from the array
                let bubbleStructure = {...prevState.bubbleStructure}
                for(let bubbles in bubbleStructure) {
                    if(bubbleStructure[bubbles].children){
                        if(bubbleStructure[bubbles].children[0] === key){
                            if(bubbleStructure[bubbles].children.length === 1) {
                                bubbleStructure[bubbles].children = null
                            }
                            else {
                                bubbleStructure[bubbles].children = [bubbleStructure[bubbles].children[1]]
                            }
                        }
                        else if(bubbleStructure[bubbles].children[1] === key){
                            bubbleStructure[bubbles].children =  [bubbleStructure[bubbles].children[0]]
                        }
                    }
                }
                return({
                    bubbleStructure,
                })
            })
            return
        }
    }

    randomColourGenerator = () =>{
        let hexNumber=Math.round(0xffffff * Math.random()).toString(16);
        let unusedDigits=(6-hexNumber.length);
        let emptyHex="000000";
        let leadZeros = emptyHex.substring(0,unusedDigits);
        let randomColor= "#" + leadZeros + hexNumber;
        return randomColor
    }

    applyGrayScale = () => {
        let bubbleStructure = {...this.state.bubbleStructure}
        for(let bubble in bubbleStructure){
            if(bubbleStructure[bubble]){
                let color = bubbleStructure[bubble].color.slice(1)

                let R = parseInt(color.slice(0,2),16)
                let G = parseInt(color.slice(2,4), 16)
                let B = parseInt(color.slice(4), 16)
                let averageShade = Math.floor((R + G + B) / 3 )
                let hex = averageShade.toString(16)
                if (hex.length < 2) {
                    hex = "0" + hex;
                }
                let grayScale = "#"+hex+hex+hex
                bubbleStructure[bubble].color = grayScale
            }
        }
        this.setState({
            bubbleStructure
        })
        this.props.updateStore(UPDATE_BOOLEAN, {state:'grayScale', value:false})

        this.myStyle = {
            backgroundColor : "gray"
        }
    }

    resetHandler = () => {
        let bubbleStructure = {
            0: {type: "row", children: null, color: this.randomColourGenerator()},
        }
        this.setState({
            bubbleStructure
        })
        this.props.updateStore(UPDATE_BOOLEAN, {state:'reset', value:false})
    }

    paintingHandler = () => {
        this.setState({color: this.props.color})
        this.props.updateStore(UPDATE_BOOLEAN, {state:'painting', value:false})
    }

    loadNewDataHandler = () =>{
        let nextKey = this.props.newBubbleStructure.length + 1

        this.setState({
            bubbleStructure: {...this.props.newBubbleStructure},
            nextKey
        })
        console.log(this.props.newBubbleStructure)
        this.props.updateStore(UPDATE_BOOLEAN, {state:'newDataToLoad', value:false})

    }

    myStyle = {
        backgroundColor: "#FFFFFF"
    }

    componentDidMount() {
        this.props.updateStore(UPDATE_OBJECT, {state:"bubbleStructure", value:this.state.bubbleStructure})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.grayScale){
            this.applyGrayScale()
        }

        if(this.props.reset){
            this.resetHandler()
        }
        if(this.props.painting){
            this.paintingHandler()
        }
        if(this.props.newDataToLoad){
            this.loadNewDataHandler()
        }
        this.props.updateStore(UPDATE_OBJECT, {state:"bubbleStructure", value:this.state.bubbleStructure})
    }

    render() {

        return (
            <div className={classes.BubbleContainer} style={this.myStyle}>
                {Object.keys(this.state.bubbleStructure).length ===1 && <Instructions/>}
                {this.bubbleGenerator(0)}
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
        grayScale: state.grayScale,
        reset: state.reset,
        color: state.color,
        painting: state.painting,
        newDataToLoad: state.newDataToLoad,
        newBubbleStructure: state.newBubbleStructure,
        paintMode: state.paintMode,
        primaryClick: state.primaryClick,
    }
}

// action dispatches (listeners)
const mapDispatchToProps = dispatch => {
    return {
        updateStore: (type, payload) => dispatch({type, payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BubbleContainer)