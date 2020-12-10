import React from 'react'

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <input type={"text"}
                       value={this.props.comment}
                       name={"comment"}
                       placeholder={"write a comment"}
                       onChange={this.props.changeHandler}
                />
                <p>Your comment:</p>
                {this.props.comment}
            </div>
        )
    }
}



export default TestComponent