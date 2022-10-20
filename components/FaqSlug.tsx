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
      p={{ base: "0px 0 180px", sm: "0px 0 180px", lg: "10px 0 0px" }}
      mb="0px"
    >
      <Box
        m="0 auto"
      >
        {/* <Heading
          fontSize={{ base: "18px", sm: "18px", lg: "18px" }}
          mb="36px"
          textTransform='uppercase'
        >
          {title ?? 'Frequently Asked Questions'}
        </Heading> */}
        <Accordion
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
        </Accordion>
      </Box>
    </Box>
  );
}
                  