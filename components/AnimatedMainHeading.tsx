import type { StyleProps } from "@chakra-ui/react";
import { Heading, chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionDiv = motion(chakra.div);

interface AnimatedMainHeadingProps extends StyleProps {
  text: string;
}

const AnimatedMainHeading = (props: AnimatedMainHeadingProps) => {
  const { text, ...rest } = props;
  const animatedText = text.trim().split(' ');

  return (
    <Heading
      as="h1"
      { ...rest }
    >
      {animatedText.map((word, index) => {
        return (
          <MotionDiv
            key={index}
            animate={{
              y: [50, 0],
              opacity: [0, 1],
            }}
            transition={{
              delay: index * 0.3,
            }}
            mr="20px"
          >
            {word}
          </MotionDiv>
        );
      })}        
    </Heading>
  )
}

export default AnimatedMainHeading;