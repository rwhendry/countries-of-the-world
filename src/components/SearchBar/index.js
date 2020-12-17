import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";
import Button from "components/Button";


const SearchBar = props => {
  const { register, getValues, handleSubmit } = useForm();

  const onSubmit = () => {
    const searchValue = getValues().search;
    if (searchValue) {
      props.onSubmit(searchValue);
    }
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
        <Button onClick={handleSubmit(onSubmit)}>Go</Button>
      </Layout>
    </form>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func
};

const Layout = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  width: 40vw;
  margin: 0 8px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0.5em;

  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 60vw;
    font-size: 0.75em;
  }
`;

export default SearchBar;
