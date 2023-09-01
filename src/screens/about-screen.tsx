import React from "react"
import { 
    ScrollView,
    Box,
    Text,
    VStack,
    Icon,
    Image,
    useColorModeValue
} from "native-base"
import {Feather} from '@expo/vector-icons'
import AnimatedColorBox from "../components/animated-color-box"
import NavBar from "../components/navbar"
import MastHead from "../components/masthead"

const AboutScreen = () => {
    return (
        <AnimatedColorBox
            w='full'
            flex={1}
            bg={useColorModeValue('blue.50','darkBlue.800')}
        >
           <MastHead
                title="About"
                color="white"
                image={require('../assets/rocket.png')}
           >
                <NavBar />
           </MastHead>
           <ScrollView
            borderTopLeftRadius='20px'
            borderTopRightRadius='20px'
            bg={useColorModeValue('warmGray.50','primary.900')}
            mt='-20px'
            pt='30px'
            p={4}
           >
            <VStack flex={1} space={4}>
                <Box alignItems='center'>
                    <Image 
                        source={require('../assets/about2.jpeg')}
                        borderRadius='full'
                        resizeMode="cover"
                        w={120}
                        h={120}
                        alt="author"
                    />
                </Box>
                <Text fontSize='md' w='full'>
                    This is a React Native app.
                </Text>
            </VStack>
           </ScrollView>
        </AnimatedColorBox>
    )
}

export default AboutScreen