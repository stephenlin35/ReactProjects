import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Input.css';

import ListItem from '../ListItem';
import SuggestionBox from "../SuggestionBox";

import Autosuggest from 'react-autosuggest';

const getSuggestionValue = (suggestion) => {
  return suggestion;
};

const renderSuggestion = (suggestion) => (
  <SuggestionBox user={suggestion} />
);

const shouldRenderSuggestions = (value) => {
  return value.trim().length > 2;
}

class Input extends React.Component {
  state = {
    suggestions: [],
  };

  handleInputChange = (e, {newValue}) => {
    this.props.handleInputChange(newValue);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    let suggestedUsers = [];
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength === 0) {
      this.setState({suggestions: []});
    }
    else { 
      fetch(`https://api.github.com/search/users?q=${inputValue}+in:login`)
        .then((res) =>  { 
          if (res.status >= 200 && res.status < 300) {
            return res.json();
          } else if (res.status === 403) {
            console.log(res.status);
            this.props.handleError('GitHub API rate limit maxiumum hit. Please try again in 1 minute.');
          };
        })
        .then((data) => {
          const maxLength = 3;
          let suggestionsArr = [];
          const suggestionsLength = Math.min(data.total_count, maxLength);
          for (let i = 0; i < suggestionsLength; i++) {
            suggestionsArr.push(data.items[i].login);
          };
          this.setState({suggestions: suggestionsArr});
        })
        .catch((err) => {
          console.log(err);
        })
    };
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const inputProps = {
      placeholder: 'Type in a GitHub user & press ENTER',
      value: this.props.input,
      onChange: this.handleInputChange
    };
    return (
      <div className={s.root}>
        <Autosuggest 
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          shouldRenderSuggestions={shouldRenderSuggestions}
          theme={s}
        />
      </div>
    );
  }
}

export default withStyles(s)(Input);
