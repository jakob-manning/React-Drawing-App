import React from 'react'
import {connect} from "react-redux";
import TestComponent from "./TestComponent";

class TestContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }

    changeHandler  = (event) => {
        console.log(event)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {

        return (
            <div>
                <input type={"text"}
                       name={"comment"}
                       placeholder={"write a comment"}
                       value={this.state.comment}
                       onChange={this.changeHandler}
                />
                <p>Your comment:</p>
                {this.state.comment}
                <br/>
                <TestComponent changeHandler={this.changeHandler} comment={this.state.comment} />
            </div>
        )
    }
}



export default TestContainer