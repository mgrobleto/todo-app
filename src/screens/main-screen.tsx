import React, { useState } from 'react'
import {
    Text,
    Box,
    Center, VStack, useColorModeValue, Pressable
} from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import TaskItem from '../components/task-item'

const MainScreen = () => {
    const [checked, setChecked] = useState<boolean>(false)
    const [subject, setSubject] =  useState('TaskItem')
    const [isEditing, setIsEditing] = useState(false)

    const handleCheckboxPress = () => {
        setChecked(prev => {
          return !prev
        })
    }

    return (
        <Center _dark={{ bg: 'blueGray.900'}} _light={{bg: 'blueGray.50'}} flex={1}>
            <VStack space={5} alignItems='center' w='full'> 
                <TaskItem 
                    isEditing={isEditing}
                    isDone={checked} 
                    onToggleCheckbox={handleCheckboxPress} 
                    subject={subject}
                    onChangeSubject={setSubject}
                    onPressLabel={() => setIsEditing(true)}
                    onFinishEditing={() => setIsEditing(false)}
                />
                <ThemeToggle />
            </VStack>
        </Center>
    )
}

export default MainScreen