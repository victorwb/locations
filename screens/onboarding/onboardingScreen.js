import React, { Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
} from "react-native";
import { withNavigation } from "react-navigation";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constants/styles";

class OnboardingScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../../assets/images/bg.jpg')}
                    resizeMode="cover"
                >
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={['black', 'rgba(0,0.10,0,0.77)', 'rgba(0,0,0,0.1)',]}
                        style={styles.pageStyle}
                    >
                        {this.inspiringTitle()}
                        {this.inspiringDescription()}
                        {this.startButton()}
                    </LinearGradient>
                </ImageBackground>
            </SafeAreaView >
        )
    }

    inspiringDescription() {
        return (
            <Text style={{ ...Fonts.grayColor16Regular, marginTop: Sizes.fixPadding + 5.0 }}>
                lives without limits the world is made to explore and appreciate its beauty
            </Text>
        )
    }

    inspiringTitle() {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.whiteColor30Bold }}>
                        {`The `}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor30Bold }}>
                        best locator
                    </Text>
                </View>
                <Text style={{ ...Fonts.whiteColor30Bold }}>
                    in Ndejje University
                </Text>
            </View>
        )
    }

    startButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('Welcome')}
                style={styles.startButtonStyle}>
                <Text style={{ ...Fonts.whiteColor15Regular }}>Start</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'flex-end',
    },
    startButtonStyle: {
        width: 65.0,
        height: 65.0,
        borderRadius: 37.5,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 8.0,
        marginBottom: Sizes.fixPadding * 4.0
    }
})

OnboardingScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(OnboardingScreen);