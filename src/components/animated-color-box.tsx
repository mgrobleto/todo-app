import React, { useEffect} from 'react';
import { Box, useToken } from 'native-base'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor} from 'react-native-reanimated'
import usePrevious from '../utils/use-previous';

const AnimateBox = Animated.createAnimatedComponent(Box)

const AnimatedColorBox = ({bg, ...props} : any) => {
    const hexBg = useToken('colors', bg)
    const progress = useSharedValue(0)
    const prevHexBg = usePrevious(hexBg)

    useEffect(() => {
        progress.value = 0
    }, [hexBg])

    const animatedStyles = useAnimatedStyle(() => {
        progress.value = withTiming(1, {duration: 200})
        return {
            backgroundColor: interpolateColor(
                progress.value,
                [0,1],
                [prevHexBg || hexBg, hexBg]
            )
        }
    }, [hexBg])

    return <AnimateBox {...props} style={animatedStyles} />
}

export default AnimatedColorBox