import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, BackHandler, ScrollView, TouchableOpacity, Image, Dimensions, } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

class ProfileScreen extends Component {

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

    state = {
        logoutDialog: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.userInfo()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
                        {this.settingsInfo()}
                        {this.logOutInfo()}
                    </ScrollView>
                </View>
                {this.logoutDialog()}
            </SafeAreaView>
        )
    }

    logoutDialog() {
        return (
            <Dialog.Container visible={this.state.logoutDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor18Regular, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        You sure want to logout?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ logoutDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor18Regular }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                this.setState({ logoutDialog: false })
                                this.props.navigation.navigate('Welcome')
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Regular }}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    logOutInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ logoutDialog: true })}
                style={styles.logOutInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="login-variant" size={24} color={Colors.grayColor} />
                    <Text style={{
                        ...Fonts.blackColor15Regular,
                        marginLeft: Sizes.fixPadding,
                        width: width / 1.8,
                    }}>
                        Logout
                    </Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={15} color={Colors.grayColor} />
            </TouchableOpacity>
        )
    }

    settingsInfo() {
        return (
            <View style={styles.settingInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('Notification')}
                >
                    {this.settings({
                        icon: <MaterialIcons name="notifications" size={22} color={Colors.grayColor} />,
                        setting: 'Notifications'
                    })}
                </TouchableOpacity>
                {this.settings({
                    icon: <AntDesign name="earth" size={20} color={Colors.grayColor} />,
                    setting: 'Language'
                })}
                {this.settings({
                    icon: <MaterialIcons name="settings" size={22} color={Colors.grayColor} />,
                    setting: 'Settings'
                })}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('InviteFriends')}
                >
                    {this.settings({
                        icon: <MaterialIcons name="group-add" size={24} color={Colors.grayColor} />,
                        setting: 'Invite Friends'
                    })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('TravelProCash')}
                >
                    {this.settings({
                        icon: <MaterialIcons name="account-balance-wallet" size={22} color={Colors.grayColor} />,
                        setting: 'TravelPro Cash'
                    })}
                </TouchableOpacity>
                {this.settings({
                    icon: <MaterialIcons name="headset-mic" size={22} color={Colors.grayColor} />,
                    setting: 'Support'
                })}
            </View>
        )
    }

    settings({ icon, setting }) {
        return (
            <View style={styles.settingStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {icon}
                    <Text style={{
                        ...Fonts.blackColor15Regular,
                        marginLeft: Sizes.fixPadding,
                        width: width / 1.8,
                    }}>
                        {setting}
                    </Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={15} color={Colors.grayColor} />
            </View>
        )
    }

    userInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('EditProfile')}
                style={styles.userInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/user.jpg')}
                        style={{
                            width: 80.0, height: 80.0,
                            borderRadius: Sizes.fixPadding - 5.0,
                        }}
                        resizeMode="cover"
                    />
                    <View style={styles.userInfoStyle}>
                        <Text style={{
                            ...Fonts.blackColor17Regular,
                            width: width / 2.3,
                        }}>
                            Christine
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            0708499251
                        </Text>
                    </View>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={15} color={Colors.grayColor} />
            </TouchableOpacity>
        )
    }

    header() {
        return (
            <Text style={{
                ...Fonts.blackColor20Bold,
                paddingHorizontal: Sizes.fixPadding * 2.0,
                paddingVertical: Sizes.fixPadding * 2.0,
            }}>
                Profile
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    userInfoWrapStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding * 2.0
    },
    userInfoStyle: {
        height: 80.0,
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding,
        marginLeft: Sizes.fixPadding
    },
    logOutInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        flexDirection: 'row',
        marginVertical: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#F1F1F1',
        borderWidth: 2.0,
    },
    settingInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        margin: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderColor: '#F1F1F1',
        borderWidth: 2.0,
    },
    settingStyle: {
        flexDirection: 'row',
        marginVertical: Sizes.fixPadding - 1.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    logOutButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    }
})

export default withNavigation(ProfileScreen);