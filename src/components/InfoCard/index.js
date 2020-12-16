import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";
import Button from "components/Button";

const Layout = styled.div`
  width: 30%;
  height: 100%;
  display: inline-block;
  border: 1px solid lightgray;
  border-radius: 1em;
  padding: 2em;
  margin-top: 2em;
  margin-right: 2em;
  word-wrap: break-word;
  position: sticky;
  top: 4em;

  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 80vw;
    border: none;
    margin-top: 0.5em;
  }
`;

const ContentLayout = styled.div`
  margin: 1em 0;
`;

const InfoCard = ({ data, onToggle, isMobile }) => {
  const { additionalInformation } = data;

  return (
    <Layout>
      {isMobile && (
        <div>
          <Button onClick={onToggle}>
            Back to results
          </Button>
        </div>
      )}
      <ContentLayout>
        {Object.keys(data).map((key, index) => (
          key !== "additionalInformation" && <div key={index}>{key}: {JSON.stringify(data[key])}</div>
        ))}

        <br/>
        <br/>

        {additionalInformation && (
          <div> Additional Information: {additionalInformation.name} </div>
        )}

        <br/>
        <br/>
        {additionalInformation && Object.keys(additionalInformation).map((key, index) => (
          <div key={index}>{key}: {JSON.stringify(additionalInformation[key])}</div>))
        }

      </ContentLayout>
    </Layout>
  );
};

InfoCard.propTypes = {
  data: PropTypes.shape(),
  onToggle: PropTypes.func,
  isMobile: PropTypes.bool
};

export default InfoCard;
