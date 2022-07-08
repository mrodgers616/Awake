import React from "react";
import {
  chakra,
  Box,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Button,
  Input
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useWeb3 } from "../contexts/Web3Context";

export default function GoveranceProposalForm({
  onClose
}: {
  onClose: () => void;
}): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // const {
  //   walletAddress,
  //   createProposal,
  // } = useWeb3();

  function onSubmit(values: any) {
    // return new Promise(async (resolve) => {      
    //   const proposalId = await createProposal(walletAddress!, 0, 'Proposal #18: Change the Climate with activism');
    //   resolve(JSON.stringify(proposalId, null, 2));
    //   onClose();
    // });
    return null;
  }

  async function fetchContractABI(contractAddress: string) {
    const res = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`);
    const json = await res.json();
    //console.log(json);
  }

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)}>
      <Box p="8px 56px 16px">
        <FormControl isInvalid={errors.from}>
          <FormLabel>
            Balance: 0.12 WBTC
            <Input 
              id="from" 
              type="number" 
              {...register('from', { required: true })}
            />
          </FormLabel>
          { errors.from && <FormErrorMessage>from input required</FormErrorMessage> }
        </FormControl>
        <FormControl isInvalid={errors.to}>
          <FormLabel>
            Balance: STX
            <Input 
              id="to" 
              type="number" 
              {...register('to', { required: true })}
            />
          </FormLabel>
          { errors.to && <FormErrorMessage>to input required</FormErrorMessage> }
        </FormControl>
        <FormControl isInvalid={errors.slippage}>
          <FormLabel>
            Description
            <Input 
              id="description" 
              type="text"
              {...register('description', { required: true, min: 0, max: 240 })}
            />
          </FormLabel>
          { errors.slippage && <FormErrorMessage>{errors.slippage?.type === 'required' ? 'Must provide a slippage' : 'another error'}</FormErrorMessage> }
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