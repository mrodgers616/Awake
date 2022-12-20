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

import { AddIcon, MinusIcon } from '@chakra-ui/icons';

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
      mb="36px"
    >
      <Box
        width={"80%"}
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
            >
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                    {faq.question}
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize='12px' />
                    ) : (
                      <AddIcon fontSize='12px' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {faq.answer}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
            // <AccordionItem
            //   key={index}
            //   p={{ base: "12px 12px 12px 12px", sm: "12px 12px 12px 12px", lg: "24px 24px 24px 12px" }}
            //   mb="24px"
            //   bg='lightblue.100'
            //   boxShadow='0px 2px 8px 0px rgba(0,0,0,0.1)'
            // >
            //   <Flex>
            //     <AccordionButton
            //       border="none"
            //       _active={{
            //         border: "none",
            //       }}
            //     >
            //       <Heading flex="1" textAlign="left" fontSize={{ base: "18px", sm: "18px", lg: "28" }}>
            //         {faq.question}
            //       </Heading>
            //     </AccordionButton>
            //     <AccordionIcon />
            //   </Flex>
            //   <AccordionPanel pb={4}>
            //     <Text fontSize={"18px"} fontWeight={400} lineHeight={"24px"}>
            //       {faq.answer}
            //     </Text>
            //   </AccordionPanel>
            // </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
}

