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
    >
      <Box
        width={"70%"}
        mx={"auto"}
      >
        <Heading
          fontSize={{ base: "18px", sm: "18px", lg: "2em" }}
          mb="36px"
          textTransform='uppercase'
        >
          {title ?? 'Frequently Asked Questions'}
        </Heading>
        <Accordion
          allowToggle
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              borderRadius="24px"
              p={{ base: "12px 12px 12px 12px", sm: "12px 12px 12px 12px", lg: "24px 24px 24px 12px" }}
              mb="24px"
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
                  <Heading flex="1" textAlign="left" fontSize={{ base: "18px", sm: "18px", lg: "28" }}>
                    {faq.question}
                  </Heading>
                </AccordionButton>
                <AccordionIcon />
              </Flex>
              <AccordionPanel pb={4}>
                <Text fontSize={"18px"} fontWeight={400} lineHeight={"31px"}>
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
