import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  Heading,
  Flex,
  Text,
  Link,
  Box,
} from '@chakra-ui/react';

type FaqProps = {
  faqs: Array<any>;
  title?: string;
}

export default function Faq({
  faqs,
  title
}: FaqProps): JSX.Element {
  return (
    <Box
      id="questions"
      p={{ base: "0px 0 0 0px", sm: "0px 0 0px", lg: "10px 0 0px" }}
      mb="0px"
    >
      <Box
        m={{base:"0",lg:"0 auto"}}
        boxShadow='2xl' p='5'
      >
        <Heading
          fontSize={{ base: "18px", sm: "18px", lg: "18px" }}
          mb={{base:"18px",lg:"36px"}}
          textTransform='uppercase'
        >
          {title ?? 'Frequently Asked Questions'}
        </Heading>
        <Accordion allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                    Does this cost money?
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize='12px' />
                    ) : (
                      <AddIcon fontSize='12px' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                It costs nothing to use Awake and we will never ask for payment information. You can think of us like an online polling platform with more influence because we&apos;re real shareholders.
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                    How do we have an impact?
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize='12px' />
                    ) : (
                      <AddIcon fontSize='12px' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                By linking your account, you&apos;re proving you own shares. We&apos;re proving to companies like Apple that their OWNERS care about the issues we&apos;re raising. This gives us more leverage at no cost to you. 
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      Do I have to own shares to help?
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize='12px' />
                    ) : (
                      <AddIcon fontSize='12px' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  There are lots of sites out there with petitions. What gives us our secret sauce is that people who join our campaigns are verified shareholders. You can still help by just signing the petition, but the bulk of the impact will be driven by verified shareholders. 
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
          {/* <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                    Where can I learn more?
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize='12px' />
                    ) : (
                      <AddIcon fontSize='12px' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                <Text fontSize={"16px"} fontWeight={400} lineHeight={"31px"}>
                <b><Link href="https://ewastemonitor.info/wp-content/uploads/2020/11/GEM_2020_def_july1_low.pdf"isExternal textColor="blue"> E-waste Monitor Report 2020</Link></b>
                  <br/>
                  <b><Link href="https://globuswarwick.com/2021/01/21/the-e-waste-problem-a-case-study-of-apple/"isExternal textColor="blue"> Apple Case Study</Link></b>
                  <br/>
                  <b><Link href="https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2022.pdf"isExternal textColor="blue"> Apple Sustainability Report 2022</Link></b>
                </Text>
                </AccordionPanel>
              </>
            )}
          </AccordionItem> */}
        </Accordion>
        {/* <Accordion
          allowToggle
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              borderRadius="12px"
              p={{ base: "12px 12px 12px 12px", sm: "12px 12px 12px 12px", lg: "1px 1px 1px 1px" }}
              mb="12px"
              bg='lightblue.500'
              boxShadow='0px 2px 8px 0px rgba(0,0,0,0.1)'
            >
              <Flex>
                <AccordionButton
                  border="none"
                  _active={{
                    border: "none",
                  }}
                >
                  <Heading flex="1" textAlign="left" fontSize={{ base: "18px", sm: "18px", lg: "18px" }}>
                    {faq.question}
                  </Heading>
                </AccordionButton> 
                <AccordionIcon />
              </Flex>
              <AccordionPanel pb={4}>
                <Text fontSize={"16px"} fontWeight={400} lineHeight={"31px"}>
                  {faq.answer}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
          <AccordionItem
              
              borderRadius="12px"
              p={{ base: "12px 12px 12px 12px", sm: "12px 12px 12px 12px", lg: "1px 1px 1px 1px" }}
              mb="12px"
              bg='lightblue.500'
              boxShadow='0px 2px 8px 0px rgba(0,0,0,0.1)'
            >
              <Flex>
                <AccordionButton
                  border="none"
                  _active={{
                    border: "none",
                  }}
                >
                  <Heading flex="1" textAlign="left" fontSize={{ base: "18px", sm: "18px", lg: "18px" }}>
                    {"Where Can I Find More Info About the Campaign?"}
                  </Heading>
                </AccordionButton> 
                <AccordionIcon />
              </Flex>
              <AccordionPanel pb={4}>
                <Text fontSize={"16px"} fontWeight={400} lineHeight={"31px"}>
                <b><Link href="https://ewastemonitor.info/wp-content/uploads/2020/11/GEM_2020_def_july1_low.pdf"isExternal textColor="blue"> E-waste Monitor Report 2020</Link></b>
                  <br/>
                  <b><Link href="https://globuswarwick.com/2021/01/21/the-e-waste-problem-a-case-study-of-apple/"isExternal textColor="blue"> Apple Case Study</Link></b>
                  <br/>
                  <b><Link href="https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2022.pdf"isExternal textColor="blue"> Apple Sustainability Report 2022</Link></b>
                </Text>
              </AccordionPanel>
            </AccordionItem>
        </Accordion> */}
      </Box>
    </Box>
  );
}
                  