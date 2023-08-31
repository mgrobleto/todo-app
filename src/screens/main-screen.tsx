import React, { useCallback, useState } from 'react'
import { Text,Box, Center, VStack, useColorModeValue, Pressable, Fab, Icon} from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import ThemeToggle from '../components/theme-toggle'
import TaskItem from '../components/task-item'
import shortid from 'shortid' // for creating iDs
import TaskList from '../components/task-list'

const initialData = [
    {
        id: shortid.generate(),
        subject: 'Comprar materiales',
        done: false
    },
    {
        id: shortid.generate(),
        subject: 'Hacer tarea',
        done: true
    }
]

const MainScreen = () => {
    const [data, setData] =  useState(initialData)
    const [editingItemId, setEditingItemId] = useState<string | null>(null)

    const handleToggleTaskItem = useCallback((item : any) => {
        setData(prevData => {
            const newData = [...prevData]
            const index = prevData.indexOf(item)
            newData[index] = {
                ...item,
                done: !item.done //it will change it state based on it its true or false
            }
            return newData
        })
    }, [])

    const handleChangeTaskItemSubject = useCallback((item : any, newSubject : string) => {
        setData(prevData => {
            const newData = [...prevData]
            const index = prevData.indexOf(item)
            newData[index] = {
                ...item,
                subject: newSubject
            }

            return newData
        })
    }, [])

    const handleFinishEditingTaskItemSubject = useCallback((_item : any) => {
        setEditingItemId(null)
    }, [])

    const handlePressTaskItemLabel = useCallback((item : any) => {
        setEditingItemId(item.id)
    }, [])

    const handleRemoveItem = useCallback((item : any) => {
        setData(prevData => {
            const newData = prevData.filter(i => i.id !== item.id) // it will filter items different than the one selected
            return newData
        })
    }, [])

    return (
        <Center _dark={{ bg: 'blueGray.900'}} _light={{bg: 'blueGray.50'}} flex={1}>
            <VStack 
                space={5} 
                alignItems='center' 
                w='full'> 
                <TaskList
                    data={data}
                    editingItemId={editingItemId}
                    onToggleItem={handleToggleTaskItem}
                    onChangeSubject={handleChangeTaskItemSubject}
                    onFinishEditingItem={handleFinishEditingTaskItemSubject}
                    onPressLabel={handlePressTaskItemLabel}
                    onRemoveItem={handleRemoveItem}
                />
                <ThemeToggle />
            </VStack>
            <Fab 
                position='absolute' 
                renderInPortal={false} 
                icon={ <Icon color='white' size='sm' as={<AntDesign name='plus' />} />}
                colorScheme={useColorModeValue('blue', 'darkBlue')}
                bg={useColorModeValue('blue.500', 'blue.400')}
                onPress={() => {
                    const id = shortid.generate()
                    setData([
                        {
                            id,
                            subject: '',
                            done: false,
                        },
                        ...data
                    ])
                    setEditingItemId(id)
                }}
            />
        </Center>
    )
}

export default MainScreen