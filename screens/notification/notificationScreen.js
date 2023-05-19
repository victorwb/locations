import React, { useState, useRef, Component } from 'react';
import { Fonts, Colors, Sizes, } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Animated,
    Dimensions,
    BackHandler
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { TransitionPresets } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

class NotificationScreen extends Component {

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
            <SafeAreaView style={{ flex: 1, }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <Notification navigation={this.props.navigation} />
            </SafeAreaView>
        )
    }
}

const rowTranslateAnimatedValues = {};

const Notification = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(
        [
            {
                key: '1',
                name: 'Booking Success',
                iconName: 'hotel',
                description: 'You have successfully booked hotel.OrderId:OID1256789.',

            },
            {
                key: '2',
                name: '25% Off use code TravelPro25',
                iconName: 'tag',
                description: 'Use code TravelPro25 for your booking between 20th sept to 25th sept and get 25% off.',
            },
            {
                key: '3',
                name: 'Flat $10 Off',
                iconName: 'tag',
                description: 'Use code TravelPro10 and get $10 off on your booking.',
            },
        ],
    );

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.name} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 135],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={styles.notificationWrapStyle}>
                    <View style={styles.notificationIconWrapStyle}>
                        <FontAwesome name={data.item.iconName} size={30} color="black" />
                    </View>
                    <View style={styles.notificationDescriptionStyle}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold }}>
                            {data.item.name}
                        </Text>
                        <Text numberOfLines={3} style={{
                            ...Fonts.grayColor16Regular,
                            marginTop: Sizes.fixPadding - 5.0
                        }}>
                            {data.item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color="black"
                    onPress={() => navigation.goBack()}
                />
                <Text style={{ ...Fonts.blackColor20Regular, marginLeft: Sizes.fixPadding }}>
                    Notifications
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {header()}
            {listData.length == 0 ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.whiteColor }}>
                    <Ionicons name="ios-notifications-off-outline" size={70} color="gray" />
                    <Text style={{ ...Fonts.grayColor17Regular, marginTop: Sizes.fixPadding * 2.0 }}>
                        No Notifications
                    </Text>
                </View>
                :
                <SwipeListView
                    disableRightSwipe
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                />
            }
            <Snackbar
                style={{ position: 'absolute', bottom: -10.0, left: -10.0, right: -10.0, backgroundColor: '#333333' }}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                {snackBarMsg}
            </Snackbar>
        </View>
    );
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
    notificationWrapStyle: {
        height: 120.0,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 2.0,
        paddingLeft: Sizes.fixPadding,
    },
    notificationIconWrapStyle: {
        height: 80.0,
        width: 80.0,
        backgroundColor: '#B2DFDB',
        borderRadius: 40.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: Colors.whiteColor,
        flex: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        marginVertical: Sizes.fixPadding - 2.0,
    },
    notificationDescriptionStyle: {
        marginLeft: Sizes.fixPadding * 2.0,
        width: width - 170,
        justifyContent: 'center',
        height: 120.0,
        paddingVertical: Sizes.fixPadding + 3.0
    }
});

NotificationScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(NotificationScreen);