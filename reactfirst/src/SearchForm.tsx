import React from "react";
import { InputWithLable } from "./InputWithLable";


type SearchFormProps = {
    searchTerm: string;
    onSearchInput: (event: React.ChangeEvent<HTMLInputElement>)=> void;
    onSearchSubmit: (event: React.FormEvent<HTMLFormElement>)=> void;
}
const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit}:SearchFormProps)=>(
    <form  onSubmit={onSearchSubmit} className="search-form">
        <InputWithLable 
          type={"text"}
          isFocused
          onInputChange={onSearchInput}
          initVal={searchTerm} 
          label={'Search'}>
            <strong>Search:</strong>
          </InputWithLable>
  
          <button 
            type ="submit"
            disabled={!searchTerm}
            className="button button_large"
          >
            Submit
          </button>
      </form>
  );

  export {SearchForm};