import {
	Box,
	Heading,
	SimpleGrid,
	Progress,
	Text,
	Badge,
	Flex,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';

const Card = ({ name, description, topics }) => {
	return (
		<Box p={4} shadow='lg' rounded='lg' borderWidth='1px'>
			<Heading>{name}</Heading>
			<Text>{description}</Text>
			{topics.map((topic) => (
				<Badge mr={2}>{topic}</Badge>
			))}
		</Box>
	);
};

const LANGUAGES = ['javascript', 'css', 'java', 'php', 'python'];

const Repositories = ({ repos }) => (
	<SimpleGrid mt={6} columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
		{repos && repos.length == 0 && <Progress size='xs' isIndeterminate />}

		{repos.map((repo) => (
			<Card {...repo} />
		))}
	</SimpleGrid>
);

export default function Home() {
	const [repos, setRepos] = useState([]);
	const [active, setActive] = useState(LANGUAGES[1]);

	useEffect(async () => {
		const response = await fetch(
			`https://api.github.com/search/repositories?q=language:${active}&sort=stars&per_page=15`
		);
		const data = await response.json();
		setRepos(data.items);
	}, [active]);

	return (
		<Box>
			<Heading h='9vh' shadow='base' p={4}>
				GitHub Trending Repositories
			</Heading>

			<Flex>
				<Box p={4} w='60' h='91vh' borderRightWidth='1px' shadow='md'>
					{LANGUAGES.map((lng) => (
						<Box
							key={lng}
							rounded='lg'
							textAlign='center'
							userSelect='none'
							cursor='pointer'
							p={2}
							bg={active === lng ? 'red.300' : ''}
							color={active === lng ? 'white' : 'gray.400'}
							onClick={() => {
								setActive(lng);
							}}
						>
							{lng.toUpperCase()}
						</Box>
					))}
				</Box>
				<Box ml={4} m='0 auto' maxW='5xl' h='91vh' overflow='auto'>
					<Repositories repos={repos} />
				</Box>
			</Flex>
		</Box>
	);
}
