/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

import Input from '../Input';
import List from '../List';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    value: '',
    users: [],
    error: '',
  };

  onInputChange = (val) => {
    this.setState({value: val, error: ''});
  };

  onKeyPress = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/search/users?q=${this.state.value}+in:login`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log(res);
          return res.json();
        } else if (res.status === 403) {
            this.setState({error: 'GitHub API rate limit maxiumum hit. Please try again in 1 minute.'});
        };
      })
      .then((data) => {         
        if (data.total_count != 0) {
          this.setState({value: '', error: '', users: this.state.users.concat(data.items[0].login)}, () => {
            console.log(this.state);
          });
        } else {
          this.setState({error: 'Not a registered GitHub user'});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onCloseClick = (user) => {
    this.setState({
      users: this.state.users.filter(u => u !== user)
    });
  };

  on403Error = (err) => {
    this.setState({
      error: err
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
        {/* value={this.state.value} */}
        <form onSubmit={this.onKeyPress}>
          <Input 
            input={this.state.value}
            // users={this.state.users}
            handleInputChange={this.onInputChange}
            handleError={this.on403Error}
            // handleKeyPress={this.onKeyPress}
          />
          <div style={{color: 'red', textAlign: 'center'}}>{this.state.error}</div>
        </form>
        <List 
          users={this.state.users}
          onCloseClick={this.onCloseClick}
        />
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);