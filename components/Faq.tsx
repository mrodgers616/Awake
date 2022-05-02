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
      p="50px 0 180px"
    >
      <Box
        m="0 auto"
      >
        <Heading
          fontSize="36px"
          mb="36px"
          textTransform='uppercase'
        >
          {title ?? 'common questions'}
        </Heading>
        <Accordion
          allowToggle
        >
          {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            borderRadius="24px"
            p="42px 46px 42px 95px"
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
                <Heading flex="1" textAlign="left">
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
