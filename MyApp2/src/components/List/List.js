import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './List.css';
import ListItem from '../ListItem';

class List extends React.Component {

    render() {
        const users = this.props.users.map((user) => (
            <ListItem 
                key={user}
                username={user} 
                onCloseClick={this.props.onCloseClick}
            />
        ));
        return(
            <div className={s.users}>
                {users}
            </div>
        );
    }
}

export default withStyles(s)(List);