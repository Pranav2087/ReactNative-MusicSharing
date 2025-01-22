import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./components/Tabs";
import MapContext from './components/MapContext';
import { colors } from "./data/theme";

const Stack = createStackNavigator();

function App() {
    const [NerLov, setNerLov] = React.useState('');
    const [Lname, setLName] = React.useState('');
    const [locationID, setLocationID] = React.useState('');

    return (
        <SafeAreaView style={{ backgroundColor: colors.darkGreen, flex: 1 }}>
            <NavigationContainer>
            <MapContext.Provider value={{ NerLov, Lname, locationID, setNerLov, setLName, setLocationID }}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={"Tabs"}
                >   
                    <Stack.Screen
                        name="Tabs"
                        children={props => <Tabs {...props}/>}
                    />
                </Stack.Navigator>
                </MapContext.Provider>
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default App;