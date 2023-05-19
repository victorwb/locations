import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, BackHandler, SafeAreaView, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Sizes } from "../constants/styles";
import HomeScreen from "../screens/home/homeScreen";
import HotelScreen from "../screens/hotel/hotelScreen";
import TripScreen from "../screens/trip/tripScreen";
import FavoriteScreen from "../screens/favorite/favoriteScreen";
import ProfileScreen from "../screens/profile/profileScreen";

class BottomTabBarScreen extends Component {

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

    state = { currentIndex: 1 };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor={Colors.primaryColor}
                    />
                    {this.state.currentIndex == 1 ?
                        <HomeScreen /> :
                        this.state.currentIndex == 2 ?
                            <HotelScreen /> :
                            this.state.currentIndex == 3 ?
                                <TripScreen /> :
                                this.state.currentIndex == 4 ?
                                    <FavoriteScreen /> :
                                    <ProfileScreen />

                    }
                    <View style={styles.bottomTabBarStyle}>
                        {this.bottomTabBarItem({
                            index: 1,
                            iconName: "home",
                        })}
                        {this.bottomTabBarItem({
                            index: 2,
                            iconName: "hotel",
                        })}
                        {this.bottomTabBarItem({
                            index: 3,
                            iconName: "flight-takeoff",
                        })}
                        {this.bottomTabBarItem({
                            index: 4,
                            iconName: "favorite",
                        })}
                        {this.bottomTabBarItem({
                            index: 5,
                            iconName: "person",
                        })}
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    bottomTabBarItem({ index, iconName }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={this.state.currentIndex == index ? styles.bottomTabSelectedIconStyle : null}
                onPress={() => this.setState({ currentIndex: index })}
            >
                <MaterialIcons name={iconName} size={30} color={
                    this.state.currentIndex == index ?
                        Colors.primaryColor : Colors.grayColor
                } />
            </TouchableOpacity>
        )
    }
}

BottomTabBarScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(BottomTabBarScreen);

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 70.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopColor: 'rgba(128, 128, 128, 0.1)',
        borderTopWidth: 0.30,
        elevation: 2.0
    },
    bottomTabSelectedIconStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: 27.5,
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})



