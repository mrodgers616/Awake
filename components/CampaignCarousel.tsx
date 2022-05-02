import React, {
  useState,
  useEffect,
} from "react";
import {
  Flex,
  Box,
  Button,
  Image,
  StyleProps
} from "@chakra-ui/react";
import {
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { BsPersonCheck } from "react-icons/bs";

interface CarouselProps extends StyleProps {
  images: string[];
}



export default function CampaignCarousel({ images, ...rest }: CarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

    const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    setCurrentImage(images[currentIndex]);
  }, [currentIndex]);

  const checkNumber = (number: number) => {

    if (number > images.length - 1) {
        return 0;
    } 

    if (number <  0) {
        return images.length - 1;
    }

    return number;
  }

  const nextImage = () => {
    setCurrentIndex(_index => {
      const newIndex = currentIndex + 1;
      return checkNumber(newIndex);
    })
  }

  const prevImage = () => {
    setCurrentIndex(_index => {
      const newIndex = currentIndex - 1;
      return checkNumber(newIndex);
    })
  }

  const Content = () => (
    images ? 
    <Image
      src={currentImage} 
      alt='an image'
      w='100%'
      objectFit={'cover'}
      h='auto'
      objectPosition={'top'}
    /> : 
    <Box h={rest.h} flexGrow={2} bgColor='sage.500' w='100%'/>
  )

  return (
    <Flex
      {...rest}
    >
      <Button
        h='100%'
        bg='transparent'
        isDisabled={!images}
        onClick={prevImage}
        mr='16px'
        _hover={{
          bg: 'transparent',
          transform: 'scale(1.1)'
        }}
      >
        <FaChevronLeft />
      </Button>
      <Box
        flexGrow={2}
        borderRadius='10px'
        overflow={'hidden'}
        h='100%'
      >
        <Content />
      </Box>
      <Button
        h='100%'
        bg='transparent'
        isDisabled={!images}
        onClick={nextImage}
        ml='16px'
        _hover={{
          bg: 'transparent',
          transform: 'scale(1.1)'
        }}
      >
        <FaChevronRight />
      </Button>
    </Flex>
  );
}
