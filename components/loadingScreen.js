import React from "react";
import { View } from "react-native";
import * as Font from "expo-font";

export default class LoadingScreen extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            NotoSans_Bold: require("../assets/fonts/noto_sans/NotoSans-Bold.ttf"),
            NotoSans_Regular: require("../assets/fonts/noto_sans/NotoSans-Regular.ttf"),
            Pecifico_Regular: require("../assets/fonts/pacifico/Pacifico-Regular.ttf")
        });
        this.props.navigation.navigate('Splash');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            </View>
        )
    }
}

