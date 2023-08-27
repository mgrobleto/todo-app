import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import theme from '../theme'

type Props = {
    children: React.ReactNode
}

const AppContainer : React.FC<Props> = ({children}) => {
    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
        </NavigationContainer>
    )
}

export default AppContainer
