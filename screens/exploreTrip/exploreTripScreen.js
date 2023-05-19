import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    BackHandler,
    TouchableOpacity,
    ImageBackground,
    Dimensions, Image
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { recommendedsList } from "../../components/recommendedList";
import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get('screen');

const placeImagesList = [
    {
        image: require('../../assets/images/trips/mount-fuji.jpg')
    },
    {
        image: require('../../assets/images/trips/swiss-alps.jpg')
    },
    {
        image: require('../../assets/images/trips/grand-teton.jpg')
    }
];

const mustVisitablePlacesList = [
    {
        id: '1',
        placeImage: require('../../assets/images/trips/swiss-alps.jpg'),
        rating: 5.0,
        placeName: 'Swiss Alps',
        location: 'Switzerland',
        offerInPercentage: 15
    },
    {
        id: '2',
        placeImage: require('../../assets/images/trips/mount-logan.jpg'),
        rating: 4.7,
        placeName: 'Mount Logan',
        location: 'Canada',
        offerInPercentage: 18
    },
    {
        id: '3',
        placeImage: require('../../assets/images/trips/mount-fuji.jpg'),
        rating: 4.4,
        placeName: 'Mount Fuji',
        location: 'Japan',
        offerInPercentage: 10
    },
    {
        id: '4',
        placeImage: require('../../assets/images/trips/mouna-kia.jpg'),
        rating: 4.0,
        placeName: 'Mauna Kea',
        location: 'United States',
        offerInPercentage: 10
    },
    {
        id: '5',
        placeImage: require('../../assets/images/trips/grand-teton.jpg'),
        rating: 4.8,
        placeName: 'Grand Teton',
        location: 'Wyoming',
        offerInPercentage: 15
    }
];

const popularDestinationsList = [
    {
        id: '1',
        destinationImage: require('../../assets/images/country/us.jpg'),
        destinationName: 'America',
    },
    {
        id: '2',
        destinationImage: require('../../assets/images/country/thailand.jpg'),
        destinationName: 'Thailand',
    },
    {
        id: '3',
        destinationImage: require('../../assets/images/country/peris.jpg'),
        destinationName: 'Peris',
    },
    {
        id: '4',
        destinationImage: require('../../assets/images/country/england.jpg'),
        destinationName: 'England',
    }
];

class ExploreTripScreen extends Component {

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
        places: placeImagesList,
        activeSlide: 0,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {this.placeImages()}
                                {this.title({ title: 'Must visit this place' })}
                                {this.mustVisitablePlaces()}
                                {this.title({ title: 'Popular Destination' })}
                                {this.popularDestinations()}
                                {this.title({ title: 'Recommended' })}
                            </>
                        }
                        data={recommendedsList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={this.renderItem}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
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
            style={styles.recommendedWrapStyle}>
            <SharedElement id={item.id}>
                <Image
                    source={item.hotelImage}
                    style={styles.recommendedImageStyle}
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

    popularDestinations() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('PopularPlace', {
                    place: item.destinationName
                })}
                style={{ alignItems: 'center', marginRight: Sizes.fixPadding * 2.0 }}>
                <Image source={item.destinationImage}
                    style={{
                        height: 170.0,
                        width: 170.0,
                        borderRadius: Sizes.fixPadding + 5.0,
                    }}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.blackColor18Regular, marginTop: Sizes.fixPadding }}>
                    {item.destinationName}
                </Text>
            </TouchableOpacity>
        )
        return (
            <FlatList
                horizontal
                data={popularDestinationsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: Sizes.fixPadding * 2.0,
                    paddingTop: Sizes.fixPadding - 5.0
                }}
            />
        )
    }

    mustVisitablePlaces() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('MustVisitPlace', {
                    place: item
                })}
                style={{ marginRight: Sizes.fixPadding * 2.0 }}>
                <SharedElement id={item.id}>
                    <Image
                        source={item.placeImage}
                        style={{
                            height: 210.0, width: 160.0,
                            borderRadius: Sizes.fixPadding + 5.0,
                        }}
                        resizeMode="cover"
                    />
                </SharedElement>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.fixPadding - 5.0 }}>
                    <MaterialIcons
                        name="star"
                        size={17}
                        color='#C0CA33'
                    />
                    <Text style={{ ...Fonts.blackColor16Regular, marginLeft: Sizes.fixPadding - 3.0 }}>
                        {item.rating.toFixed(1)}
                    </Text>
                </View>
                <Text style={{ ...Fonts.blackColor18Regular, marginTop: Sizes.fixPadding - 7.0 }}>
                    {item.placeName}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: Sizes.fixPadding - 5.0
                }}>
                    <MaterialIcons
                        name="location-on"
                        size={17}
                        color={Colors.grayColor}
                    />
                    <Text style={{ ...Fonts.grayColor16Regular }}>
                        {item.location}
                    </Text>
                </View>
                <View style={{
                    backgroundColor: '#F44336',
                    borderTopLeftRadius: Sizes.fixPadding + 5.0,
                    borderBottomRightRadius: Sizes.fixPadding + 5.0,
                    alignSelf: 'flex-start',
                    paddingVertical: Sizes.fixPadding + 2.0,
                    paddingHorizontal: Sizes.fixPadding + 5.0
                }}>
                    <Text style={{ ...Fonts.whiteColor15Regular }}>
                        {item.offerInPercentage}% OFF
                    </Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                horizontal
                data={mustVisitablePlacesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: Sizes.fixPadding * 2.0,
                    paddingTop: Sizes.fixPadding - 5.0,
                    paddingBottom: Sizes.fixPadding
                }}
            />
        )
    }

    title({ title }) {
        return (
            <Text style={{
                ...Fonts.blackColor20Bold,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding + 5.0,
            }}>
                {title}
            </Text>
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

    _renderItem({ item }) {
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
                <Text style={{ ...Fonts.blackColor20Regular }}>Trips</Text>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color="black"
                    style={{
                        position: 'absolute',
                        left: 20.0,
                    }}
                    onPress={() => this.props.navigation.pop()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 60.0,
        alignItems: 'center',
        justifyContent: 'center',
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

ExploreTripScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(ExploreTripScreen);