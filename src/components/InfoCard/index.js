import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";
import Button from "components/Button";
import sentenceCase from "utils/sentenceCase";


const dataIsEmpty = (data) => {
  for(var i in data) return false;
  return true;
};

const InfoCard = ({ data, onToggle, isMobile }) => {
  const { additionalInformation } = data;

  if (dataIsEmpty(data)) {
    return (
      <Layout>
        <h1>Country<hr/></h1>
        Select the country you wish to explore
      </Layout>
    );
  }

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
        <h1>{data.name}<hr/></h1>
        <Table style={{ marginBottom: "3em"}}>
          <tbody>
            {Object.keys(data).map((key, index) => (
              key !== "additionalInformation" &&
            <TableRow key={index}>
              <TableKey>{sentenceCase(key)}</TableKey>
              <TableCell>{data[key]}</TableCell>
            </TableRow>
            ))}
          </tbody>
        </Table>

        {additionalInformation && (
          <>
            <strong>Additional Information on {additionalInformation.name}<hr/></strong>
            <Table>
              <tbody>
                {additionalInformation && Object.keys(additionalInformation).map((key, index) => (
                  <TableRow key={index}>
                    <TableKey>{sentenceCase(key)}</TableKey>
                    <TableCell>{additionalInformation[key]}</TableCell>
                  </TableRow>
                ))
                }
              </tbody>
            </Table>
          </>
        )}
      </ContentLayout>
    </Layout>
  );
};

InfoCard.propTypes = {
  data: PropTypes.shape(),
  onToggle: PropTypes.func,
  isMobile: PropTypes.bool
};

const Layout = styled.div`
  width: 30%;
  height: 100%;
  display: inline-block;
  border: 1px solid lightgray;
  border-radius: 1em;
  padding: 2em;
  margin-top: 2em;
  overflow-y: scroll;
  height: 55vh;

  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 90vw;
    border: none;
    margin-top: 0.5em;
    font-size: 0.75em;
    height: 65vh;
  }
`;

const ContentLayout = styled.div`
  margin: 1em 0;
`;

const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
`;

const TableKey = styled.td`
  vertical-align: top;
  text-align: left;
  padding: 8px;
  font-weight: bold;
`;

const TableCell = styled.td`
  text-align: left;
  padding: 8px;
  word-break: break-word;
`;

const TableRow = styled.tr`
  :nth-child(even) {
    background-color: whitesmoke;
  }
`;

export default InfoCard;
