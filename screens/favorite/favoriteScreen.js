import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts } from "../../constants/styles";
import TabBarScreen from "../../components/tabBarScreen";

class FavoriteScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View>
                    {this.header()}
                </View>

                <TabBarScreen navigation={this.props.navigation} />
            </SafeAreaView>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Regular }}>
                    Favorite
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
    }
})

export default withNavigation(FavoriteScreen);