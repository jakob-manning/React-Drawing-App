import React from 'react';
import Tools from "../../Components/Toolbar/Tools/Tools";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Modal from "../../Components/UI/Modal/Modal";
import SaveMenu from "../../Components/Menus/SaveMenu/SaveMenu";
import LoadMenu from "../../Components/Menus/Load Menu/LoadMenu";
import Axios from "axios";
import Toolbar from "../../Components/Toolbar/Toolbar";
import {connect} from "react-redux";
import SideDrawer from "../../Components/UI/SideDrawer/SideDrawer";

class Menus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toolBar: false,
            saveMenu: false,
            loadMenu: false,
            title: '',
            waitingForNetwork: false,
            saved: false,
            error: false,
            networkData: '',
            loadError: false,

        }
    }

    toolbarClickHandler = () => {
        this.setState({toolBar: !this.state.toolBar})
    }

    saveHandler = () => {
        this.setState({
            saveMenu: true,
            loadMenu: false,
            saved: false,
            error: false,
        })
    }

    loadHandler = () => {
        this.setState({
            loadMenu: true,
            saveMenu: false,
            error: false,
        })
        this.axiosGet()
    }

    backgroundClick = () => {
        this.setState({
            saveMenu:false,
            loadMenu: false
        })
    }

    changeHandler  = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitHandler = () => {
        this.setState({error: false})
        let css = {
            padding: this.props.padding,
            margin: this.props.margin,
            radius: this.props.radius,
            border: this.props.border
        }
        let data = {
            title: this.state.title,
            structure: this.props.bubbleStructure,
            css
        }
        Axios.post("https://react-message-board-21068.firebaseio.com/Drawings.json", data)
            .then(response => {
                this.setState({URL:response.data.name})
                this.setState({
                    saved:true,
                    title: '',
                })
            })
            .catch(error => this.setState(error))
    }

    axiosGet = () => {
        Axios.get("https://react-message-board-21068.firebaseio.com/Drawings.json")
            .then(response => this.setState({networkData: response.data}))
            .catch(error => this.setState({loadError: true}))
    }

    componentDidMount() {
        this.axiosGet()
    }


    render() {

        return (
            <Auxiliary>
                <SideDrawer
                    show = {this.state.loadMenu}
                    backgroundClick ={this.backgroundClick}
                >
                    <LoadMenu
                        error={this.state.loadError}
                        networkData={this.state.networkData}
                    />
                </SideDrawer>
                <Modal show={this.state.saveMenu}
                       backgroundClick={this.backgroundClick}
                       title={this.state.title}
                >
                    <SaveMenu change={this.changeHandler}
                              submit={this.submitHandler}
                              title={this.state.title}
                              artTitle={this.state.artTitle}
                              saved={this.state.saved}
                    />
                    />
                </Modal>
                <Toolbar
                    show={this.state.toolBar}
                    toolbarClickHandler={this.toolbarClickHandler}>
                    <Tools saveHandler={this.saveHandler} loadHandler={this.loadHandler} />
                </Toolbar>
            </Auxiliary>
        );
    }
}

// state to props
const mapStateToProps = state => {
    return {
        bubbleStructure: state.bubbleStructure,
        padding: state.padding,
        margin: state.margin,
        radius: state.radius,
        border: state.border,
    }
}

// action dispatches (listeners)
const mapDispatchToProps = dispatch => {
    return {
        updateStore: (type, payload) => dispatch({type, payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menus)