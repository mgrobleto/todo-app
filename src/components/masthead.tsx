import React from "react"
import { ImageSourcePropType } from "react-native"
import { Image, Box, Heading, VStack } from "native-base"

interface Prosp {
    title: string
    image: ImageSourcePropType
    color: string
    children: React.ReactNode
}

const MastHead : React.FC<Prosp> = ({title, image, color, children}) => {
    return (
        <VStack h='300px' pb={5}>
            <Image
                position='absolute'
                left={0}
                right={0}
                bottom={0}
                w='full'
                h='300px'
                resizeMode="cover"
                source={image}
                alt="masthead image"
            />
            {children}
            <Box flex={1}/>
            <Heading color={color} p={6} size='xl'>
                {title}
            </Heading>
        </VStack>
    )
}

export default MastHead