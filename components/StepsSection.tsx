import { Flex, Box, Heading, StyleProps } from "@chakra-ui/react";
import type { ResponsiveValue } from "@chakra-ui/react";
import { Property } from "csstype";
import StepsCard from "./StepsCard";

interface StepSectionProps extends StyleProps {
  steps: Array<any>;
  title?: string;
  headingAlignment?: ResponsiveValue<Property.TextAlign> | undefined;
}

export default function StepsSection({
  steps,
  title,
  headingAlignment = "left",
  ...rest
}: StepSectionProps): JSX.Element {
  return (
    <Box overflow={"none"} mb={rest.mb || "8px"}>
      <Heading
        mb="32px"
        mx="18px"
        textTransform="uppercase"
        fontSize="28px"
        textAlign={headingAlignment}
      >
        {title ?? "how it works"}
      </Heading>
      <Flex
        id="steps"
        overflow="unset"
        wrap="wrap"
        alignContent="center"
        justifyContent="space-between"
      >
        {steps.map((option, index) => (
          <StepsCard
            key={index}
            {...option}
            w={{sm: "calc(100% - 1em)", xl: "calc(30% - 1em)"}}
            minW="300px"
            padding="32px"
            boxShadow="0px 4px 100px 5px rgba(0,0,0,0.1)"
            borderRadius="15px"
            mx="1em"
            mb="36px"
            flexDirection="column"
            alignItems="center"
          />
        ))}
      </Flex>
    </Box>
  );
}
