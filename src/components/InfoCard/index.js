import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MOBILE_BREAK_POINT } from "constants/mobileBreakPoint";
import Button from "components/Button";
import sentenceCase from "utils/sentenceCase";


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
        <h1>{data.name}<hr/></h1>
        <Table style={{ marginBottom: "3em"}}>
          {Object.keys(data).map((key, index) => (
            key !== "additionalInformation" &&
            <TableRow key={index}>
              <TableHead>{sentenceCase(key)}</TableHead>
              <TableCell>{data[key]}</TableCell>
            </TableRow>
          ))}
        </Table>

        {additionalInformation && (
          <>
            <strong>Additional Information on {additionalInformation.name}<hr/></strong>
            <Table>
              {additionalInformation && Object.keys(additionalInformation).map((key, index) => (
                <TableRow key={index}>
                  <TableHead>{sentenceCase(key)}</TableHead>
                  <TableCell>{additionalInformation[key]}</TableCell>
                </TableRow>
              ))
              }
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
  max-height: 55vh;

  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 90vw;
    border: none;
    margin-top: 0.5em;
    font-size: 0.75em;
    max-height: 65vh;
  }
`;

const ContentLayout = styled.div`
  margin: 1em 0;
`;

const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
`;

const TableHead = styled.th`
  vertical-align: top;
  text-align: left;
  padding: 8px;
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
