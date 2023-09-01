import React, {useCallback} from 'react'
import { HStack, VStack, Center, Avatar, Heading, IconButton, useColorModeValue } from 'native-base'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import AnimatedColorBox from './animated-color-box'
import ThemeToggle from './theme-toggle'
import MenuButton from '../components/menu-button'
import { Feather } from '@expo/vector-icons'


const SideBar:React.FC<DrawerContentComponentProps> = ({state, navigation}) => {

    const currentRoute = state.routeNames[state.index]

    const handlePressBackButton = useCallback(() => {
        navigation.closeDrawer()
    }, [navigation])

    const handlePressMenuMain = useCallback(() => {
        navigation.navigate('Main')
    }, [navigation])

    const handlePressMenuAbout = useCallback(() => {
        navigation.navigate('About')
    }, [navigation])

    return (
        <AnimatedColorBox
            safeArea
            flex={1}
            bg={useColorModeValue('blue.50', 'darkBlue.800')}
            p={7}
        >
            <VStack flex={1} space={2}>
                <HStack justifyContent='flex-end' p={2}>
                    <IconButton
                        onPress={handlePressBackButton}
                        borderRadius={100}
                        variant='outline'
                        borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
                        _icon={{
                            as: Feather,
                            name: 'chevron-left',
                            size: 6,
                            color: useColorModeValue('blue.300', 'darkBlue.700')
                        }} 
                    />
                </HStack>
                <Avatar
                    source={require('../assets/profile.png')}
                    size='xl'
                    borderRadius={100}
                    mb={3}
                    mt={6}
                    borderColor='white'
                    borderWidth={2}
                />
                <Heading mb={4} size='lg'>
                    Gabriela Robleto
                </Heading>
                <MenuButton 
                    active={currentRoute === 'Main'}
                    onPress={handlePressMenuMain}
                    icon='inbox'
                >
                    Tasks
                </MenuButton>
                <MenuButton active={currentRoute === 'About'} onPress={handlePressMenuAbout} icon='info'>
                    About
                </MenuButton>
            </VStack>
            <Center>
                <ThemeToggle />
            </Center>
        </AnimatedColorBox>
    )
}

export default SideBar