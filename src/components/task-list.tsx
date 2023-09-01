import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
    PanGestureHandlerProps,
    ScrollView
} from 'react-native-gesture-handler'
import TaskItem from './task-item'
import { makeStyledComponent } from '../utils/styles'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
   id: string
   subject: string
   done: boolean
}

interface TaskListProps {
    data : Array<TaskItemData>
    editingItemId: string | null
    onToggleItem : (item : TaskItemData) => void
    onChangeSubject : (item : TaskItemData, newSubject: string) => void
    onFinishEditingItem : (item : TaskItemData) => void
    onPressLabel : (item : TaskItemData) => void
    onRemoveItem : (item : TaskItemData) => void
}

// Pick<Types, keys> we select the keys we wish to Pick from the Type
interface TaskItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    data: TaskItemData
    isEditing: boolean
    onToggleItem: (item: TaskItemData) => void
    onChangeSubject : (item : TaskItemData, newSubject: string) => void
    onFinishEditing : (item : TaskItemData) => void
    onPressLabel : (item : TaskItemData) => void
    onRemove : (item : TaskItemData) => void
}

export const AnimatedTaskItem : React.FC<TaskItemProps> = ({
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove
}) => {

    const handleToggleCheckbox =  useCallback(() => {
        onToggleItem(data)
    }, [data, onToggleItem])

    const handleChangeSubject = useCallback( 
        (subject : string) => {
        onChangeSubject(data, subject)
    }, [data, onChangeSubject])

    const handleFinishEditing = useCallback(() => {
        onFinishEditing(data)
    }, [data, onFinishEditing])

    const handleOnPressLabel = useCallback(() => {
        onPressLabel(data)
    }, [data, onPressLabel])

    const handleOnRemove = useCallback(() => {
        onRemove(data)
    }, [data, onRemove])

    return (
        <StyledView 
            w='full'
            from = {{
                opacity: 0,
                scale: 0.5,
                marginBotton: -46
            }}
            animate = {{
                opacity: 1,
                scale: 1,
                marginBotton: 0
            }}
            exit = {{
                opacity: 0,
                scale: 0.5,
                marginBotton: -46
            }}
        >
            <TaskItem
                simultaneousHandlers={simultaneousHandlers}
                subject={data.subject}
                isDone={data.done}
                isEditing={isEditing}
                onToggleCheckbox={handleToggleCheckbox}
                onChangeSubject={handleChangeSubject}
                onFinishEditing={handleFinishEditing}
                onPressLabel={handleOnPressLabel}
                onRemove={handleOnRemove}
            />

        </StyledView>
    )
}

const TaskList : React.FC<TaskListProps> = ({
   data,
   editingItemId,
   onToggleItem,
   onChangeSubject,
   onFinishEditingItem,
   onPressLabel,
   onRemoveItem
}) => {

    // refering on scroll view
    const refScrollView = useRef(null)

    return(
        <StyledScrollView ref={refScrollView} w="full">
            <AnimatePresence>
                {data.map(item => (
                    <AnimatedTaskItem 
                        key={item.id}
                        data={item}
                        simultaneousHandlers={refScrollView}
                        isEditing={item.id === editingItemId}
                        onToggleItem={onToggleItem}
                        onChangeSubject={onChangeSubject}
                        onFinishEditing={onFinishEditingItem}
                        onPressLabel={onPressLabel}
                        onRemove={onRemoveItem}
                    />
                ))}
            </AnimatePresence>
        </StyledScrollView>
    )
}

export default TaskList