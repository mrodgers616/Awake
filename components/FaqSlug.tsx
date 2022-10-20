import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  Heading,
  Flex,
  Text,
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
        </Accordion>
      </Box>
    </Box>
  );
}
