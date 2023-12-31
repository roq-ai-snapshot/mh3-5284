import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['MarketingAnalyst'];
  const roles = ['MarketingAnalyst', 'MarketingAnalyst', 'Owner', 'MarketingManager'];
  const applicationName = 'MH3';
  const tenantName = 'organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As a MarketingAnalyst, I want to create an organization so that I can manage the digital marketing budget for my company.

2. As a MarketingAnalyst, I want to add digital marketing channels to my organization so that I can track and optimize the budget allocation for each channel.

3. As a MarketingAnalyst, I want to update the budget allocation for each digital marketing channel so that I can ensure the most efficient use of my company's marketing budget.

4. As a MarketingAnalyst, I want to delete digital marketing channels from my organization when they are no longer relevant or needed, so that I can maintain an accurate and up-to-date budget allocation.

5. As an Owner, I want to invite MarketingManagers to join my organization so that they can help manage and optimize the digital marketing budget.

6. As a MarketingManager, I want to view the digital marketing channels and their budget allocation within my organization so that I can make informed decisions about budget adjustments.

7. As a MarketingManager, I want to suggest changes to the budget allocation for each digital marketing channel so that I can help optimize the overall marketing budget efficiency.

8. As an Owner, I want to review and approve or reject the suggested budget allocation changes made by MarketingManagers so that I can ensure the most efficient use of my company's marketing budget.

9. As a MarketingAnalyst, I want to view the history of budget allocation changes for each digital marketing channel so that I can analyze the impact of past decisions on the current budget efficiency.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
