import * as React from 'react'
import {
    Text,
    Box,
    Center, VStack, useColorModeValue
} from 'native-base'
import ThemeToggle from '../components/theme-toggle'

const MainScreen : React.FC = () => {
    return (
        <Center _dark={{ bg: 'blueGray.900'}} _light={{bg: 'blueGray.50'}} px={4} flex={1}>
            <VStack space={5} alignItems='center'> 
                <Box p={2} rounded={5} bg={useColorModeValue('red.500', 'yellow.500')}>
                    <Text>Hellooo</Text>
                </Box>
                <ThemeToggle />
            </VStack>
        </Center>
    )
}

export default MainScreen