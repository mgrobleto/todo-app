import React, {useCallback} from 'react'
import { Box, HStack, useColorModeValue, useToken, Pressable, Icon, Input } from 'native-base'
import AnimatedCheckbox from 'react-native-checkbox-reanimated'
import AnimatedTaskLabel from './animated-task-label'
import SwipeView from './swipable-view'
import { Feather } from '@expo/vector-icons'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

// Pick<Types, keys> we select the keys we wish to Pick from the Type
interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
    isDone: boolean,
    isEditing: boolean,
    onToggleCheckbox?: () => void
    onPressLabel?: () => void
    onRemove?: () => void
    onChangeSubject?: (subject : string) => void
    onFinishEditing?: () => void
    subject: string
}

const TaskItem : React.FC<Props> = ({
    isDone, 
    isEditing ,
    onToggleCheckbox, 
    onChangeSubject, 
    onRemove, 
    onFinishEditing, 
    onPressLabel, 
    simultaneousHandlers, 
    subject
}) => {

    // styles
    
    const highlightColor = useToken(
        'colors',
        useColorModeValue('blue.500', 'blue.400')
    )

    const boxStroke = useToken(
        'colors',
        useColorModeValue('muted.300', 'muted.500')
    )

    const checkmarkColor = useToken('colors', useColorModeValue('white', 'white'))

    const activeTextColor = useToken(
        'colors',
        useColorModeValue('darkText', 'lightText')
    )

    const doneTextColor = useToken(
        'colors',
        useColorModeValue('muted.400', 'muted.600')
    )

    const handleChangeSubject = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            onChangeSubject && onChangeSubject(e.nativeEvent.text)
        }, [onChangeSubject]
    )

    return (
        <SwipeView
            simultaneousHandlers={simultaneousHandlers}
            onSwipeLeft={onRemove}
            backView={
                <Box
                    w='full'
                    h='full'
                    bg='red.500'
                    alignItems='flex-end'
                    justifyContent='center'
                    pr={4}
                >
                    <Icon color='white' as={<Feather name='trash-2' />} size='sm'/>
                </Box>
            }
        >
            <HStack
                alignItems='center'
                w='full'
                px={4}
                py={2}
                bg={useColorModeValue('warmGray.50', 'primary.900')} 
            >    
                <Box width={30} height={30} mr={2}>
                    <Pressable onPress={onToggleCheckbox}>
                        <AnimatedCheckbox highlightColor={highlightColor} checkmarkColor={checkmarkColor} boxOutlineColor={boxStroke} checked={isDone}/>
                    </Pressable>
                </Box>
                {isEditing ? (
                    //if its true
                    <Input
                        placeholder='Task'
                        value={subject}
                        variant='unstyled'
                        fontSize={19} 
                        px={1}
                        py={0}
                        autoFocus
                        blurOnSubmit
                        onChange={handleChangeSubject}
                        onBlur={onFinishEditing}
                    />
                ) : ( //else if not
                    <AnimatedTaskLabel 
                        textColor={activeTextColor} 
                        inactiveTextColor={doneTextColor} 
                        strikethrough={isDone}
                        onPress={onPressLabel}
                    >
                        {subject}
                    </AnimatedTaskLabel>
                )}
                
            </HStack>
        </SwipeView>
    )
}

export default TaskItem