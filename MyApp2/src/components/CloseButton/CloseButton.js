import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CloseButton.css';

class CloseButton extends React.Component {

    handleCloseClick = () => {
        this.props.onCloseClick(this.props.user);
    };

    render() {
        return(
            <button 
                className={s.close}
                onClick={this.handleCloseClick}
            >
                x
            </button>
        );
    }
}

export default withStyles(s)(CloseButton);