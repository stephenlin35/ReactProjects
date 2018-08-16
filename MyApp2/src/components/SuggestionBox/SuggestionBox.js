import React from "react";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SuggestionBox.css';

class SuggestionBox extends React.Component {
    render() {
        return (
            <div className={s.box}>
                {this.props.user}
            </div>
        );
    }
}

export default withStyles(s)(SuggestionBox);
