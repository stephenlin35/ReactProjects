import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListItem.css';
import CloseButton from '../CloseButton';

class ListItem extends React.Component {
    render() {
        return(
            <div className={s.item}>
                <p>@{this.props.username}</p>
                <CloseButton 
                    user={this.props.username}
                    onCloseClick={this.props.onCloseClick} 
                />
            </div>
        );
    }
}

export default withStyles(s)(ListItem);