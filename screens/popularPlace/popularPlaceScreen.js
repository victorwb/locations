import React from "react";
import { Component } from "react";
import { Text, View, SafeAreaView, Image, StatusBar, BackHandler, TouchableOpacity, ImageBackground, FlatList, StyleSheet, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';
import { recommendedsList } from "../../components/recommendedList";
import { TransitionPresets } from 'react-navigation-stack';

const { width } = Dimensions.get('screen');

const placeImagesList = [
    {
        image: require('../../assets/images/top_destination/admin.jpg')
    },
    {
        image: require('../../assets/images/top_destination/Ndejje-University-Gents-Hall-Yokaana.png')
    },
    {
        image: require('../../assets/images/top_destination/noah.jpg')
    }
];

const topDestinationsList = [
    {
        id: '1',
        destinationImage: require('../../assets/images/top_destination/admin.jpg'),
        destinationName: 'Effil Tower',
        place: 'Paris',
        rating: 4.9,
    },
    {
        id: '2',
        destinationImage: require('../../assets/images/top_destination/Ndejje-University-Gents-Hall-Yokaana.png'),
        destinationName: 'Louvre Museum',
        place: 'Paris',
        rating: 4.4,
    },
    {
        id: '3',
        destinationImage: require('../../assets/images/top_destination/noah.jpg'),
        destinationName: 'Cathedrale Notre-Dame de Paris',
        place: 'Paris',
        rating: 4.5,
    },
    {
        id: '4',
        destinationImage: require('../../assets/images/top_destination/top_destination_4.jpg'),
        destinationName: 'Arc de Triomphe',
        place: 'Paris',
        rating: 4.0,
    },
    {
        id: '5',
        destinationImage: require('../../assets/images/top_destination/top_destination_5.jpg'),
        destinationName: 'Musee d Orsay',
        place: 'Paris',
        rating: 4.3,
    }
];

class PopularPlaceScreen extends Component {

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

    place = this.props.navigation.getParam('place');

    state = {
        places: placeImagesList,
        activeSlide: 0,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View>
                    {this.header()}
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {this.placeImages()}
                                {this.placeInfo()}
                                {this.categoryInfo()}
                                {this.topDestinationInfo()}
                                {this.recommendedTitle()}
                            </>
                        }
                        showsVerticalScrollIndicator={false}
                        data={recommendedsList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={this.renderItem}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
                    />
                </View>
            </SafeAreaView>
        )
    }

    recommendedTitle() {
        return (
            <Text style={{
                ...Fonts.blackColor20Bold,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding + 5.0
            }}>
                Recommended
            </Text>
        )
    }

    renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.props.navigation.push('HotelDetail',
                {
                    item
                }
            )}
            style={styles.recommendedWrapStyle}
        >
            <SharedElement id={item.id}>
                <Image
                    source={item.hotelImage}
                    style={styles.recommendedImageStyle}
                    resizeMode="cover"
                />
            </SharedElement>
            <View style={styles.recommendedInfoWrapStyle}>
                <View style={{
                    width: width / 1.7
                }}>
                    <Text numberOfLines={2} style={{ ...Fonts.blackColor18Regular }}>
                        {item.hotelName}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: Sizes.fixPadding - 5.0,
                        alignItems: 'center'
                    }}>
                        {this.showRating({ number: item.rating })}
                        <Text style={{ ...Fonts.grayColor15Regular, marginLeft: Sizes.fixPadding }}>
                            ({item.rating.toFixed(1)})
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name="location-on"
                            size={16}
                            color={Colors.grayColor}
                        />
                        <Text style={{ ...Fonts.grayColor17Regular, marginLeft: Sizes.fixPadding - 3.0 }}>
                            {item.place}
                        </Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryColor30Regular }}>
                        ${item.amount}
                    </Text>
                    <Text style={{ ...Fonts.grayColor15Regular }}>
                        per night
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    showRating({ number }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 || number == 1.0) ?
                        <MaterialIcons
                            name="star"
                            size={24}
                            color='#C0CA33'
                        />
                        :
                        <MaterialIcons
                            name="star-outline"
                            size={24}
                            color='#C0CA33'
                        />
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0) ?
                        <MaterialIcons
                            name="star"
                            size={24}
                            color='#C0CA33'
                        />
                        :
                        <MaterialIcons
                            name="star-outline"
                            size={24}
                            color='#C0CA33'
                        />
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0) ?
                        <MaterialIcons
                            name="star"
                            size={24}
                            color='#C0CA33'
                        />
                        :
                        <MaterialIcons
                            name="star-outline"
                            size={24}
                            color='#C0CA33'
                        />
                }
                {
                    (number == 5.0 || number == 4.0) ?
                        <MaterialIcons
                            name="star"
                            size={24}
                            color='#C0CA33'
                        />
                        :
                        <MaterialIcons
                            name="star-outline"
                            size={24}
                            color='#C0CA33'
                        />
                }
                {
                    (number == 5.0) ?
                        <MaterialIcons
                            name="star"
                            size={24}
                            color='#C0CA33'
                        />
                        :
                        <MaterialIcons
                            name="star-outline"
                            size={24}
                            color='#C0CA33'
                        />
                }
            </View>
        )
    }

    topDestinationInfo() {
        const renderItem = ({ item }) => (
            <View style={{
                marginRight: Sizes.fixPadding * 2.0
            }}>
                <View>
                    <Image
                        source={item.destinationImage}
                        style={{
                            height: 150,
                            width: 200.0,
                            borderRadius: Sizes.fixPadding + 5.0,
                        }}
                    />
                    <Text style={{ ...Fonts.blackColor18Regular, marginTop: Sizes.fixPadding - 2.0 }}>
                        {item.destinationName}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: Sizes.fixPadding - 5.0
                    }}>
                        <MaterialIcons
                            name="location-on"
                            size={20}
                            color={Colors.grayColor}
                        />
                        <Text style={{ ...Fonts.grayColor17Regular, marginLeft: Sizes.fixPadding - 3.0 }}>
                            {item.place}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name="star"
                            size={20}
                            color='#C0CA33'
                        />
                        <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding - 3.0 }}>
                            {item.rating}
                        </Text>
                    </View>
                </View>
            </View>
        )
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 3.0, }}>
                <Text style={{
                    ...Fonts.blackColor20Bold,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginBottom: Sizes.fixPadding + 5.0
                }}>
                    Top Destination
                </Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={topDestinationsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
                />
            </View>

        )
    }

    categoryInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding * 3.0,
            }}>
                <Text style={{ ...Fonts.blackColor20Bold }}>
                    Category
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {this.category({
                        icon: require('../../assets/images/icons/beach.png'),
                        name: 'Beach'
                    })}
                    {this.category({
                        icon: require('../../assets/images/icons/camera.png'),
                        name: 'Photography'
                    })}
                    {this.category({
                        icon: require('../../assets/images/icons/tour.png'),
                        name: 'Tour'
                    })}
                    {this.category({
                        icon: require('../../assets/images/icons/travel.png'),
                        name: 'Travel'
                    })}

                </View>
            </View>
        )
    }

    category({ icon, name }) {
        return (
            <View style={{
                alignItems: 'center',
                marginTop: Sizes.fixPadding + 5.0
            }}>
                <Image
                    source={icon}
                    style={{ width: 40.0, height: 40.0 }}
                />
                <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                    {name}
                </Text>
            </View>
        )
    }

    placeInfo() {
        return (
            <View style={{
                marginBottom: Sizes.fixPadding * 3.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding
            }}>
                <Text style={{ ...Fonts.blackColor20Bold, marginVertical: Sizes.fixPadding }}>
                    {this.place}
                </Text>
                <Text style={{ ...Fonts.grayColor16Regular, textAlign: 'justify' }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>
        )
    }

    placeImages() {
        return (
            <View>
                <Carousel
                    data={this.state.places}
                    sliderWidth={width}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={4000}
                    itemWidth={width}
                    renderItem={this._renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                {this.pagination()}
            </View>
        )
    }

    _renderItem({ item, index }) {
        return (
            <View>
                <ImageBackground
                    source={item.image}
                    style={{
                        width: width,
                        height: 230.0,
                    }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={[
                            'transparent',
                            'transparent',
                            'transparent',
                            'transparent',
                            'transparent',
                            'rgba(255,255,255,0.8)',
                            'rgba(255,255,255,0.99)',
                        ]}
                        style={{
                            width: width,
                            height: 230.0,
                        }}
                    >
                    </LinearGradient>
                </ImageBackground>
            </View>
        )
    }

    pagination() {
        const { places, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={places.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotStyle={styles.sliderActiveDotStyle}
                inactiveDotStyle={styles.sliderInactiveDotStyle}
            />
        );
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Regular }}>
                    {this.place}
                </Text>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    style={{
                        position: 'absolute',
                        left: 20.0,
                    }}
                    onPress={() =>
                        this.props.navigation.pop()
                    }
                />
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
    },
    sliderActiveDotStyle: {
        width: 12,
        height: 12,
        borderRadius: 6.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding - 15.0
    },
    sliderInactiveDotStyle: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: Colors.primaryColor
    },
    sliderPaginationWrapStyle: {
        position: 'absolute',
        bottom: -20.0,
        left: 0.0,
        right: 0.0,
    },
    recommendedWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding + 7.0,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    recommendedImageStyle: {
        height: 200.0,
        width: '100%',
        borderTopLeftRadius: Sizes.fixPadding + 7.0,
        borderTopRightRadius: Sizes.fixPadding + 7.0,
    },
    recommendedInfoWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Sizes.fixPadding + 5.0
    }
})

PopularPlaceScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.FadeFromBottomAndroid,
    }
}

export default withNavigation(PopularPlaceScreen);