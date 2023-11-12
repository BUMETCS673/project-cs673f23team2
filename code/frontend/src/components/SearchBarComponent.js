import React from "react"

export default function SearchBarComponent(props) {

    const searchKeyword = props.value;
    const handleSearchInput = props.onChange;
    const handleInputKeyPress = props.onKeyDown;

    return (
        <input
          data-cy="searchBarElement"
          className="SearchBarElement"
          type="text"
          value={searchKeyword}
          onChange={handleSearchInput}
          onKeyDown={handleInputKeyPress}
        />
    )
}