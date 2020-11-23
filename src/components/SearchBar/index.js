import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";

const Layout = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  // min-width: 40vw;
  margin: 0 8px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0.5em;
`;

const SearchBar = props => {
  const { register, getValues, handleSubmit } = useForm();

  const onSubmit = () => {
    const searchValue = getValues().search;
    props.onSubmit(searchValue);
  };

  return (
    <form>
      <Layout>
        <Input
          ref={register({})}
          label="Search"
          type="text"
          name="search"
          placeholder="Search"
        />
        <button onClick={handleSubmit(onSubmit)}>Go</button>
      </Layout>
    </form>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func
};

export default SearchBar;
