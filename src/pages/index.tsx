import { Button, Flex, Heading, Image, Text, Stack, useBreakpointValue } from '@chakra-ui/react';

import { signIn, signUp, requireNextAuth } from '@roq/nextjs';

import Head from 'next/head';
import { HelpBox } from 'components/help-box';

function HomePage() {
  return (
    <>
      <Head>
        <title>MH3</title>

        <meta
          name="description"
          content="Empower Your Digital Marketing Strategy with MH3: Revolutionizing B2B Software for Unparalleled Budget Efficiency and Performance Optimization"
        />
      </Head>

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack position="relative" spacing={6} w={'full'} maxW={'lg'}>
            <HelpBox />
            <Image src="/roq.svg" alt="Logo" w="150px" mb="8" />
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text as={'span'}>Explore</Text>{' '}
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'cyan.400',
                  zIndex: -1,
                }}
              >
                {`MH3`}
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              {`Empower Your Digital Marketing Strategy with MH3: Revolutionizing B2B Software for Unparalleled Budget Efficiency and Performance Optimization`}
            </Text>

            <Text>organization</Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'cyan.500'}
                color={'white'}
                _hover={{
                  bg: 'cyan.700',
                }}
                onClick={() => signUp('marketing-analyst')}
              >
                Create Account
              </Button>
              <Button rounded={'full'} onClick={() => signIn('marketing-analyst')}>
                Login
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4OTJ8MXwxfHNlYXJjaHwxfHxCMkIlMkNkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fHx8MTY4NjU5NDgzOXww&ixlib=rb-4.0.3&q=80&w=1080'
            }
          />
        </Flex>
      </Stack>
    </>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: true,
  redirectTo: '/users',
})(HomePage);
