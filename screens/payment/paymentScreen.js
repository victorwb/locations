import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, BackHandler, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { TransitionPresets } from 'react-navigation-stack';

const { width } = Dimensions.get('screen');

class PaymentScreen extends Component {

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
        currentPaymentMethodIndex: 2,
        showSuccessDialog: false,
    }

    amount = this.props.navigation.getParam('amount');

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
                    >
                        {this.payableAmountInfo()}
                        {this.paymentMethod({
                            icon: require('../../assets/images/payment_icon/cash_on_delivery.png'),
                            paymentType: 'Pay on Delivery',
                            index: 1,
                        })}
                        {this.paymentMethod({
                            icon: require('../../assets/images/payment_icon/amazon_pay.png'),
                            paymentType: 'Amazon Pay',
                            index: 2,
                        })}
                        {this.paymentMethod({
                            icon: require('../../assets/images/payment_icon/card.png'),
                            paymentType: 'Card',
                            index: 3,
                        })}
                        {this.paymentMethod({
                            icon: require('../../assets/images/payment_icon/paypal.png'),
                            paymentType: 'PayPal',
                            index: 4,
                        })}
                        {this.paymentMethod({
                            icon: require('../../assets/images/payment_icon/skrill.png'),
                            paymentType: 'Skrill',
                            index: 5,
                        })}
                    </ScrollView>
                    {this.payButton()}
                </View>
                {this.successDialog()}
            </SafeAreaView>
        )
    }

    successDialog() {
        return (
            <Dialog.Container
                visible={this.state.showSuccessDialog}
                contentStyle={styles.dialogWrapStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center' }}>
                    <View style={styles.successIconWrapStyle}>
                        <MaterialIcons name="done" size={40} color={Colors.primaryColor} />
                    </View>
                    <Text style={{ ...Fonts.grayColor16Regular, marginTop: Sizes.fixPadding + 10.0 }}>
                        Success!
                    </Text>
                </View>
            </Dialog.Container>
        )
    }

    payButton() {
        return (
            <View style={styles.payButtonOuterWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this.setState({ showSuccessDialog: true })
                        setTimeout(() => {
                            this.setState({ showSuccessDialog: false })
                            this.props.navigation.navigate('BottomTabBar');
                        }, 3000);
                    }
                    }
                    style={styles.payButtonWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor19Regular }}>
                        Pay
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    payableAmountInfo() {
        return (
            <View style={styles.payableAmountWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Regular }}>
                    Pay ${this.amount}
                </Text>
            </View>
        )
    }

    paymentMethod({ icon, paymentType, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ currentPaymentMethodIndex: index })}
                style={{
                    borderColor: this.state.currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                    ...styles.paymentMethodWrapStyle
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={icon}
                        style={{
                            width: 50.0,
                            height: 50.0,
                        }}
                        resizeMode="contain"
                    />
                    <Text numberOfLines={1} style={{
                        ...Fonts.blackColor16Bold, marginLeft: Sizes.fixPadding,
                        width: width / 2.2
                    }}>
                        {paymentType}
                    </Text>
                </View>
                <View style={{
                    borderColor: this.state.currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                    ...styles.radioButtonStyle
                }}>
                    {
                        this.state.currentPaymentMethodIndex == index ?
                            <View style={{
                                width: 12.0,
                                height: 12.0,
                                borderRadius: 6.0,
                                backgroundColor: Colors.primaryColor
                            }}>
                            </View> : null
                    }
                </View>
            </TouchableOpacity>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black"
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={{ ...Fonts.blackColor20Regular, marginLeft: Sizes.fixPadding + 5.0 }}>
                    Payment
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        flexDirection: 'row',
        height: 60.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    paymentMethodWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding,
    },
    radioButtonStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    payButtonOuterWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderTopColor: '#ECECEC',
        borderTopWidth: 1.0,
        height: 75.0,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    payButtonWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 5.0,
        height: 55.0,
        width: '100%',
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 150,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 3.0
    },
    successIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payableAmountWrapStyle: {
        backgroundColor: '#C7E9EE',
        paddingVertical: Sizes.fixPadding + 10.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding
    }
})

PaymentScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(PaymentScreen);