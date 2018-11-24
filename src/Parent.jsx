import React, { Component } from 'react';
import Child from './Child';

class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: true
        };
    }

    updateState() {
        this.setState({shown: false});
        console.log("updateState() in Parent");
    }

    render() {
        return (
            <Child
                updateParent={this.updateState.bind(this)}
            />
        );
    }
}

export default Parent;
