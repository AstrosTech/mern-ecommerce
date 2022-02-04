import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    MenuItem,
    // useBreakpointValue,
  } from '@chakra-ui/react';
  
  export default function hero() {
    return (
      <Flex
        w={'full'}
        h={'70vh'}
        backgroundImage={
          'url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/streetwear-brands-1627934788.jpg)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          // px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={5}>
            <Text
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}>
              Our new Spring/Summer Collection
            </Text>
            <Stack direction={'row'}>
                <Button
                  bg={'blue.400'}
                  rounded={'full'}
                  color={'white'}
                  _hover={{ bg: 'blue.500' }}>
                  Explore
                </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    );
  }
