import type { NextPage } from "next";
import Head from "next/head";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Container,
  Heading,
  Text,
  Flex,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Link,
  Textarea,
  Select,
  chakra,
  Image,
  Tooltip,
  Center,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { useForm, useController } from "react-hook-form";
import Upload from "rc-upload"
import React, { ChangeEvent, useState } from "react";
import { addProposalToStore, addImageToStorage } from "../../lib/firebaseClient";
import _ from "lodash";
import axios from "axios";
import Router from "next/router";
import Testimonial from "../../components/AppModern/TestimonialCreate";


const CreateCampaign: NextPage = (_props: any) => {
  const [_etherscanAddress, _setEtherscanAddress] = useState(null);
  const [fetchedContractABI, setFetchedContractABI] = useState<
    Array<Record<string, any>>
  >([]);
  const [selectedFunction, setSelectedFunction] = useState<Record<string, any>>(
    {}
  );

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const {
    handleSubmit: handleGovernanceSubmit,
    register: registerGovernance,
    formState: {
      errors: governanceErrors,
      isSubmitting: _governanceIsSubmitting,
    },
    reset: governanceReset,
  } = useForm();

  const handleContractSearch = _.debounce(
    (e) => fetchContract(e.target.value),
    1000
  );

  function fetchContract(address: string) {
    const contractRegexp = /^(0x)?[0-9a-f]{40}$/i;
    if (address === "") return;
    if (!contractRegexp.test(address)) return;
    axios
      .get(
        `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_KEY}`
      )
      .then((res) => {
        const abi = JSON.parse(res.data.result);
        setFetchedContractABI(abi);
      })
      .catch((err) => {
        //console.log(err);
      });
  }

  let fileData: any;

  const uploaderProps = {
    action: '',
    data: { a: 1, b: 2 },
    multiple: false,
    beforeUpload(file: any) {
      //console.log('beforeUpload', file.name);
    },
    onStart: (file: any) => {
      //console.log('onStart', file.name);
    },
    onSuccess(file: any) {
      ////console.log('onSuccess', file);
      storeImageData(file, file.name);
    },
    onProgress(step: any, file: any) {
      //console.log('onProgress', Math.round(step.percent), file.name);
    },
    onError(err: any) {
      //console.log('onError', err);
    },
    capture: 'user',
  };

  function storeImageData(file: any, name: any) {
    fileData = file;
    //console.log(name);
    //console.log(fileData);
  }

  function addFileName() {
    if (typeof fileData === undefined || fileData === null) {
      return "No file yet";
    }
    else {
      return fileData.name;
    }
  }

  function handleContractFunctionSelection(e: ChangeEvent<HTMLSelectElement>) {
    const [functionData] = (
      fetchedContractABI as Array<Record<string, any>>
    ).filter((func) => {
      return func.name === e.target.value;
    });
    setSelectedFunction(functionData);
  }

  function onSubmit(values: any) {
    return new Promise((resolve: any) => {
      setTimeout(async () => {
        // construct proposal data.
        const proposal = {
          ...values,
          title:
            values.proposalType === "activist"
              ? values.title
              : values.governanceTitle,
          description:
            values.proposalType === "activist"
              ? values.description
              : values.governanceDescription,
          status: 0,
          verified: false,
          canClick: false,
        };
        // // create a thread.
        // const response = await fetch(`/api/discourse/thread`, {
        //   method: "POST",
        //   body: JSON.stringify(proposal),
        // });

        const doc = await addProposalToStore(proposal);

        // if (response.status === 200) {
        //   const test = await response.json();
        //   // add threadId to proposal.
        //   proposal.threadId = test.topic_id;
        //   // create proposal. use the threadId as description.

        //   // if (doc!.id) {
        //   //   if (values.proposalType === "activist") {
        //   //     await createProposal(walletAddress!, doc!.id);
        //   //   } else {
        //   //     const keys = Object.keys(values).filter((key: string) =>
        //   //       key.includes("function-")
        //   //     );
        //   //     let inputs = [];
        //   //     for (const key of keys) {
        //   //       inputs.push(values[key]);
        //   //     }
        //   //     await createGovernanceProposal(
        //   //       walletAddress!,
        //   //       doc!.id,
        //   //       values.smartContractAddress,
        //   //       fetchedContractABI,
        //   //       values.contractFunctions,
        //   //       inputs
        //   //     );
        //   //   }
        //   // }
        // } else {
        //   const responseError = await response.json();
        //   //console.log(responseError);
        //   return;
        // }
        reset();
        //governanceReset();
        resolve();
        Router.push("/campaigns");
      }, 100);
    });
  }

  return (
    <>
      <Head>
        <title>Awake | Create Proposal</title>
      </Head>
      <Box mt="120px" bg="white" mb="50px">
        <Container>
          <Flex h="180px" justifyContent="center" alignItems="center">
            <Center>
            <Heading
              textAlign="center"
              fontSize={{base: "40px", md: "60px", lg: "80px"}}
              backgroundClip="text"
              color="black"
            >
              Create a Proposal
            </Heading>
            </Center>
          </Flex>
          
          {/* Adding the cards into the page --------------------------------------------------*/}
          <Box textAlign="center" ml="5%"  mb="75px" maxW="100%">
              <Container display={{ base: "block", sm: "block", md:"none", lg: "none" }} maxW="90%">
                  <Testimonial ></Testimonial>
              </Container>
              <Container display={{ base: "none", sm: "none", md:"block", lg: "block" }}>
              <Flex>
              <Box
                width="25%"
                fontSize="xl"
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  height="100px"
                  width="100px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2043.png?alt=media&token=d43f47a3-d634-410f-a223-9643d41f602d"
                />
                <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold">
                  Select a company
                </Text>
                <Text fontSize="sm">
                  Identify a company. Use this <Link href="https://awakeinvest.gitbook.io/shares/" color="#32006B">guide</Link>
                </Text>
              </Box>
              <Box
                width="25%"
                fontSize="xl"
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  height="100px"
                  width="100px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2045.png?alt=media&token=efa701a7-13d1-4ed2-864f-7100cae9534f"
                />
                <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold">
                  Select a cause
                </Text>
                <Text fontSize="sm">
                  Identify a specific change you want to see at a corporation. Use this <Link href="https://awakeinvest.gitbook.io/shares/" color="#32006B">guide</Link>.
                </Text>
              </Box>
              <Box
                width="25%"
                fontSize="xl"
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  height="100px"
                  width="100px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2046.png?alt=media&token=e395073c-7208-4a26-a301-398abe5fb4ec"
                />
                <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold">
                  Build a case
                </Text>
                <Text fontSize="sm">
                  Make a case that this good for the planet AND
                  for the company. Use this <Link href="https://awakeinvest.gitbook.io/shares/" color="rgb(100, 43, 115)">guide</Link>.
                </Text>
              </Box>
              <Box
                width="25%"
                fontSize="xl"
                backgroundColor="whiteAlpha.500"
                m={1}
                padding="4px"
              >
                <Image
                  height="100px"
                  width="100px"
                  ml="auto"
                  mr="auto"
                  src="https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2047.png?alt=media&token=18ac4bec-db75-4d18-b88d-070865319871"
                />
                <Text ml="auto" mr="auto" textAlign="center" p={3} fontWeight="bold">
                  Craft a proposal
                </Text>
                <Text fontSize="sm">
                  We’ll collaborate with you to bring this proposal to life. <Link href="https://awakeinvest.gitbook.io/shares/" color="#32006B">Learn more</Link>.
                </Text>
              </Box>
              </Flex>
              </Container>
          </Box>
          {/* End of the Top section---------------------------------------------- */}

          <Box maxW={{base: "100%", md: "1800px", lg: "1800px"}}>
            <Tabs variant="enclosed" borderRadius="8px">
              <TabList>
                <Tab
                  w="100%"
                  bg="grey"
                  _selected={{
                    bg: "white",
                    color: "inherit",
                    borderColor: "inherit",
                    borderBottomColor: "white",
                  }}
                >
                  Proposal ‎<Tooltip label="Proposals must be verified by Awake before they are published"><QuestionOutlineIcon/></Tooltip>
                </Tab>
                {/* <Tab
                  w="300px"
                  bg="grey"
                  _selected={{
                    bg: "white",
                    color: "inherit",
                    borderColor: "inherit",
                    borderBottomColor: "white",
                  }}
                >
                  Governance Proposal
                </Tab> */}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <chakra.form
                    display="block"
                    flexDirection="column"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <FormControl

                      visibility="hidden"
                      position="absolute"
                    >
                      <Input
                        id="proposalType"
                        {...register("proposalType")}
                        defaultValue="activist"
                      />
                      <FormErrorMessage>

                      </FormErrorMessage>
                    </FormControl>
                    <FormControl mt="16px">
                      <FormLabel htmlFor="title">Title:</FormLabel>
                      <Input
                        id="title"
                        placeholder="Proposal Title"
                        {...register("title", {
                          required: "Please provide a campaign title",
                          minLength: {
                            value: 1,
                            message:
                              "The campaign title should be at least 15 characters long",
                          },
                        })}
                      />
                      <FormErrorMessage>

                      </FormErrorMessage>
                    </FormControl>
                    <FormControl mt="16px">
                      <FormLabel htmlFor="symbol">Company Stock Ticker:</FormLabel>
                      <Input
                        {...register("symbol", {
                          required: "Please add the stock symbol",
                        })}
                        placeholder="TSLA"
                      />
                      <FormErrorMessage>

                      </FormErrorMessage>
                    </FormControl>
                    <FormControl mt="16px">
                      <FormLabel htmlFor="companyName">Company Name:</FormLabel>
                      <Input
                        {...register("companyName", {
                          required: "Please enter the company name",
                        })}
                        placeholder="Tesla"
                      />
                      <FormErrorMessage>

                      </FormErrorMessage>
                    </FormControl>
                    <FormControl mt="16px">
                      <FormLabel htmlFor="description">Description:</FormLabel>
                      <Textarea
                        {...register("description", {
                          required: "Please outline your campaign",
                          minLength: {
                            value: 1,
                            message:
                              "Your outline should have a minimum of 20 characters",
                          },
                        })}
                        placeholder="Outline your proposal..."
                        rows={10}
                      />
                      <Flex>
                        {/* @ts-ignore */}
                        {/* <Upload {...uploaderProps}>
                          <Button
                          alignSelf={"flex-end"}
                          mt={4}
                          colorScheme="cyan"
                          isLoading={isSubmitting}
                          w="200px">
                            Upload Image
                          </Button>
                        </Upload>
                        <Text size='30px'>No file Uploaded</Text> */}
                      </Flex>
                      <FormErrorMessage>

                      </FormErrorMessage>
                    </FormControl>
                    <Flex alignSelf="end">
                      <Button
                        alignSelf={"flex-end"}
                        mt={4}
                        color="#32006B"
                        isLoading={isSubmitting}
                        w="300px"
                        type="submit"
                      >
                        Submit Proposal
                      </Button>
                    </Flex>
                  </chakra.form>
                </TabPanel>
                <TabPanel>
                  <chakra.form
                    display="flex"
                    flexDirection="column"
                    onSubmit={handleGovernanceSubmit(onSubmit)}
                  >
                    <FormControl

                      visibility="hidden"
                      position="absolute"
                    >
                      <Input
                        id="proposalType"
                        {...registerGovernance("proposalType")}
                        defaultValue="governance"
                      />
                      <FormErrorMessage>

                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      mt="16px"
                    >
                      <FormLabel htmlFor="governanceTitle">Title:</FormLabel>
                      <Input
                        id="governanceTitle"
                        placeholder="Governance Proposal Title"
                        {...registerGovernance("governanceTitle", {
                          required: "Please provide a campaign title",
                          minLength: {
                            value: 15,
                            message:
                              "The campaign title should be at least 15 characters long",
                          },
                        })}
                      />
                      <FormErrorMessage>

                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      mt="16px"
                    >
                      <FormLabel htmlFor="governanceDescription">
                        Description:
                      </FormLabel>
                      <Textarea
                        id="governanceDescription"
                        {...registerGovernance("governanceDescription", {
                          required: "Please outline your campaign",
                          minLength: {
                            value: 20,
                            message:
                              "Your outline should have a minimum of 20 characters",
                          },
                        })}
                        placeholder="Outline your proposal..."
                        rows={10}
                      />
                      <FormErrorMessage>

                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      mt="16px"
                    >
                      <FormErrorMessage>

                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      mt="16px"
                    >
                      {/* ^0x[a-fA-F0-9]{40}$ */}
                      <Select
                        id="contractFunctions"
                        placeholder="Enter the target address..."
                        {...registerGovernance("contractFunctions", {
                          required: "Please select a function",
                        })}
                        onChange={handleContractFunctionSelection}
                        disabled={!fetchedContractABI}
                      >
                        {fetchedContractABI !== undefined &&
                          fetchedContractABI.map((item, index) => (
                            <option key={index} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                      </Select>
                      <FormErrorMessage>

                      </FormErrorMessage>
                    </FormControl>
                    {selectedFunction &&
                      selectedFunction.inputs &&
                      selectedFunction.inputs.map(
                        (input: Record<string, any>, index: number) => (
                          <FormControl
                            mt="16px"
                            key={index}
                          >
                            <FormLabel htmlFor={`function-${input.name}`}>
                              {input.name}
                            </FormLabel>
                            <Input
                              id={`function-${input.name}`}
                              placeholder={`Enter the ${input.name}...`}
                              {...registerGovernance(`function-${input.name}`, {
                                required: "Please enter the input value",
                              })}
                            />
                            <FormErrorMessage>

                            </FormErrorMessage>
                          </FormControl>
                        )
                      )}
                    <Flex alignSelf="end">
                      <Button
                        alignSelf={"flex-end"}
                        mt={4}
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        w="300px"
                        type="submit"
                      >
                        Submit Proposal
                      </Button>
                    </Flex>
                  </chakra.form>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CreateCampaign;
