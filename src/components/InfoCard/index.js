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
`;

const TableRow = styled.tr`
  :nth-child(even) {
    background-color: lavender;
  }
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
        <h1>{data.name}<hr/></h1>
        <Table>
          {Object.keys(data).map((key, index) => (
            key !== "additionalInformation" &&
            <TableRow key={index}>
              <TableHead>{key.replace(/^./, key[0].toUpperCase())}</TableHead>
              <TableCell>{data[key]}</TableCell>
            </TableRow>
          ))}
        </Table>

        <br/>
        <br/>

        {additionalInformation && (
          <div> Additional Information on {additionalInformation.name} <hr/> </div>
        )}

        {/* <br/>
        <br/> */}

        <Table>
          {additionalInformation && Object.keys(additionalInformation).map((key, index) => (
            <TableRow key={index}>
              <TableHead>{key.replace(/^./, key[0].toUpperCase())}</TableHead>
              <TableCell>{additionalInformation[key]}</TableCell>
            </TableRow>
          ))
          }
        </Table>

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
