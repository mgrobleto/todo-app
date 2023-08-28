import * as React from 'react'
import {
    Text,
    Box,
    Center, VStack, useColorModeValue, Pressable
} from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import TaskItem from '../components/task-item'

const MainScreen = () => {
    const [checked, setChecked] = React.useState<boolean>(false)

    const handleCheckboxPress = () => {
        setChecked(prev => {
          return !prev
        })
    }

    return (
        <Center _dark={{ bg: 'blueGray.900'}} _light={{bg: 'blueGray.50'}} px={4} flex={1}>
            <VStack space={5} alignItems='center' w='full'> 
                <TaskItem isDone={checked} onToggleCheckbox={handleCheckboxPress}/>
                <ThemeToggle />
            </VStack>
        </Center>
    )
}

export default MainScreen