import React, { useCallback, useState } from 'react'
import { Text,Box, Center, VStack, useColorModeValue, Pressable, Fab, Icon} from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import shortid from 'shortid' // for creating iDs
import TaskList from '../components/task-list'
import MastHead from '../components/masthead'
import NavBar from '../components/navbar'

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
        <AnimatedColorBox
            w='full'
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
        >
            <MastHead
                title="What's up, Gabriela"
                color='white'
                image={require('../assets/masthead.png')}
            >
                <NavBar />
            </MastHead>
            <VStack
                flex={1}
                space={1}
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                mt='-20px'
                borderTopLeftRadius='20px'
                borderTopRightRadius='20px'
                pt='20px'
                > 
                <TaskList
                    data={data}
                    editingItemId={editingItemId}
                    onToggleItem={handleToggleTaskItem}
                    onChangeSubject={handleChangeTaskItemSubject}
                    onFinishEditingItem={handleFinishEditingTaskItemSubject}
                    onPressLabel={handlePressTaskItemLabel}
                    onRemoveItem={handleRemoveItem}
                />
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
        </AnimatedColorBox>
    )
}

export default MainScreen