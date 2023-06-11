import styled from "@emotion/styled";
import React from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";

const Suggestion = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  .react-autosuggest__container {
    height: 40px;
    border: none;
    outline: none;
  }
  .react-autosuggest__input {
    height: 100%;
    border: none;
    outline: none;
    background-color: #f9f9f9;
  }
  .react-autosuggest__suggestions-container--open {
    position: absolute;
    background-color: #ffffff;
    border: 1px solid #babbae;
    border-top: none;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    left: -1px;
    top: 35px;
    width: 100% !important;
    outline: none;
    z-index: 100000000;
    li {
      list-style-type: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      border-bottom: 1px solid #ddd;
      padding: 3px 3px;
    }
    @media (max-width: 600px) {
      li a {
        display: block !important;
      }
    }
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  object-fit: contain;
`;

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: "C",
    year: 1972,
  },
  {
    name: "Elm",
    year: 2012,
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = async (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const data = await axios.get(`${URL}/getbooks/${value}`);
  console.log(data.data.data, "suggestions");
  return inputLength === 0 ? [] : data.data.data;
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion) => (
  <Link to={`./book/${suggestion._id}`}>
    <Suggestion>
      <Img src={suggestion.image} alt="" />
      {suggestion.name}
    </Suggestion>
  </Link>
);

export class AutoSuggest extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: "",
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: await getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type a book name",
      value,
      onChange: this.onChange,
    };

    // Finally, render it!
    return (
      <Container>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </Container>
    );
  }
}
