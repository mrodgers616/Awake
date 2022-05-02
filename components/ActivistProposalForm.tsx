import React from "react";
import {
  chakra,
  Box,
  FormLabel,
  FormControl,
  Button,
  Input
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function ActivistProposalForm({
  onClose
}: {
  onClose: () => void;
}): JSX.Element {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.stringify(values, null, 2));
        onClose();
      }, 500);
    });
  }

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <Box p="8px 56px 16px">
        <FormControl>
          <FormLabel>
            <Input id="swapFrom" type="number"></Input>
          </FormLabel>
          <FormLabel>
            Balance: STX
            <Input id="swapTo" type="number"></Input>
          </FormLabel>
          <FormLabel>
            Slippage tollerance
            <Input id="slippage" type="number"></Input>
          </FormLabel>
        </FormControl>
      </Box>
      <Box p="0 56px" m="24px 0 40px">
        <Button
          type="submit"
          w="100%"
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </chakra.form>
  );
}