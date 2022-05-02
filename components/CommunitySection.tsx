import {
  Grid,
  GridItem,
  Box,
  Heading,
  Image
} from '@chakra-ui/react';

type CommunityMember = {
  src?: string;
  handle?: string;
}

type FaqProps = {
  community: CommunityMember[];
  title?: string;
}

export default function CommunitySection({
  community,
  title
}: FaqProps): JSX.Element {
  return (
    <Box>
      <Heading
        textTransform='uppercase'
        fontSize='36px'
        mb='24px'
      >
          { title ?? 'Community' }
      </Heading>

      <Grid 
        templateColumns={`repeat(10, 1fr)`} 
        autoRows='100px'
        gap={6}
      >
        {community.map((item, index) => (
          <GridItem key={index}>
            <Image 
              src={item.src} 
              alt={`image of ${item.handle}`} 
              objectFit='cover'
              w='100%'
              h='100%'
            />
          </GridItem>))}
      </Grid>
    </Box>
  );
}
