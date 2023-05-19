import React, { Component, useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Image,
    BackHandler,
} from "react-native";
import { withNavigation } from "react-navigation";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constants/styles";
import IntlPhoneInput from 'react-native-intl-phone-input';

class LoginScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    render() {
        return (
            <Login navigation={this.props.navigation} />
        )
    }
}

const Login = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

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
                    style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {welcomeInfo()}
                        {phoneNumberTextField()}
                        {continueButton()}
                        {otpText()}
                        {loginWithFacebookButton()}
                        {loginWithGoogleButton()}
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView >
    );

    function loginWithGoogleButton() {
        return (
            <View style={styles.loginWithGoogleButtonStyle}>
                <Image
                    source={require('../../assets/images/google.png')}
                    style={{ height: 30.0, width: 30.0, }}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.blackColor17Regular, marginLeft: Sizes.fixPadding + 5.0 }}>
                    Log in with Google
                </Text>
            </View>
        )
    }

    function loginWithFacebookButton() {
        return (
            <View style={styles.loginWithFacebookButtonStyle}>
                <Image
                    source={require('../../assets/images/facebook.png')}
                    style={{ height: 30.0, width: 30.0, }}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.whiteColor17Regular, marginLeft: Sizes.fixPadding + 5.0 }}>
                    Log in with Facebook
                </Text>
            </View>
        )
    }

    function otpText() {
        return (
            <Text style={{ ...Fonts.whiteColor17Regular, textAlign: 'center' }}>
                We’ll send otp for verification
            </Text>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Verification')}
            >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['rgba(68, 182, 200, 0.4)', 'rgba(68, 182, 200, 0.5)', 'rgba(68, 182, 200, 0.6)']}
                    style={styles.continueButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor17Regular }}>
                        Continue
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    function phoneNumberTextField() {
        return (
            <IntlPhoneInput
                onChangeText={({ phoneNumber }) => setPhoneNumber(phoneNumber)}
                defaultCountry="UG"
                containerStyle={styles.phoneNumberWrapStyle}
                placeholder="Phone Number"
                phoneInputStyle={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor17Regular }}
                dialCodeTextStyle={{ ...Fonts.whiteColor17Regular, marginLeft: Sizes.fixPadding }}
            />
        )
    }

    function welcomeInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 8.0,
                marginBottom: Sizes.fixPadding * 4.0
            }}>
                <Text style={{ ...Fonts.whiteColor30Bold }}>
                    Welcome back
                </Text>
                <Text style={{
                    ...Fonts.whiteColor17Regular,
                    marginTop: Sizes.fixPadding
                }}>Login your account</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    phoneNumberWrapStyle: {
        height: 55.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: Sizes.fixPadding * 2.5,
        marginTop: Sizes.fixPadding * 6.0,
    },
    loginWithGoogleButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        height: 55.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    loginWithFacebookButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 6.0,
        marginBottom: Sizes.fixPadding * 4.0,
        backgroundColor: '#3B5998',
        flexDirection: 'row',
        height: 55.0,
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 5.0,
        marginBottom: Sizes.fixPadding,
        height: 55.0,
    },
    searchCountryTextFieldContentStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        borderBottomWidth: 1.0,
        borderBottomColor: Colors.grayColor
    }
})

LoginScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(LoginScreen);