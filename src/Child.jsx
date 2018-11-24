import React, { Component } from 'react';

class Child extends Component {
    render() {
        return (
            <button
                type="button"
                onClick={this.props.updateParent}
            >
                Update Parent
            </button>
        );
    }
}

export default Child;
