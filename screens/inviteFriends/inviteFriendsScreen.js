import React from "react";
import { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, BackHandler } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from "react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

class InviteFriendsScreen extends Component {

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
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.shareCodeInfo()}
                    {this.referralCodeInfo()}
                </View>
            </SafeAreaView>
        )
    }

    referralCodeInfo() {
        return (
            <View style={{
                backgroundColor: '#EEEEEE',
                padding: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding,
            }}>
                <View style={{ alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor17Regular }}>
                        Your Referral Code
                    </Text>
                    <View style={styles.referralCodeWrapStyle}>
                        <Text style={{
                            ...Fonts.blackColor20Regular,
                            marginRight: Sizes.fixPadding * 11.0
                        }}>
                            SLP809
                        </Text>
                        <MaterialIcons name="content-copy" size={25} color={Colors.primaryColor} />
                    </View>
                </View>
                <View style={styles.shareOptionsWrapStyle}>
                    <View style={styles.shareWithWhatsAppWrapStyle}>
                        <Text style={{ ...Fonts.whiteColor17Regular }}>
                            Whatsapp
                        </Text>
                        <MaterialCommunityIcons name="whatsapp" size={30} color={Colors.whiteColor} />
                    </View>
                    <View style={styles.shareWithMoreOptionsWrapStyle}>
                        <Text style={{ ...Fonts.blackColor17Regular }}>
                            More Options
                        </Text>
                        <MaterialIcons name="share" size={24} color="black" />
                    </View>
                </View>
            </View>
        )
    }

    shareCodeInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor18Regular, marginBottom: Sizes.fixPadding - 5.0 }}>
                    Share Code & save at least 25%
                </Text>
                <Text style={{ ...Fonts.grayColor16Regular, textAlign: 'justify' }}>
                    Your friend gets $15 TravelPro cash on sign up.You get $15 when they book trip or experience of $75 or more within 21 days.you can earn upto $200 TravelPro Cash.
                </Text>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color="black"
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={{ ...Fonts.blackColor20Regular, marginLeft: Sizes.fixPadding }}>
                    Invite Friends
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 3.0,
    },
    referralCodeWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        borderColor: Colors.grayColor,
        borderWidth: 1.7,
        borderRadius: Sizes.fixPadding + 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'dotted',
        marginVertical: Sizes.fixPadding
    },
    shareWithWhatsAppWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#8DC88F',
        borderRadius: Sizes.fixPadding * 2.5,
        flex: 0.47,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
    },
    shareWithMoreOptionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding * 2.5,
        flex: 0.47,
        paddingVertical: Sizes.fixPadding + 2.0,
        paddingHorizontal: Sizes.fixPadding,
        borderColor: Colors.grayColor,
        borderWidth: 0.50,
    },
    shareOptionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding
    }
})

InviteFriendsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(InviteFriendsScreen);