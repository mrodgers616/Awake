import React from "react";
import {
  Heading,
  Text
} from "@chakra-ui/react";

export default function ActivistProposalForm({ name, twitter }): JSX.Element {
  return (
    <>
      <Heading>{ name }</Heading>
    </>
  );
}