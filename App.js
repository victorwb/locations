import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { TransitionPresets } from 'react-navigation-stack';
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import LoadingScreen from "./components/loadingScreen";
import allReviewsScreen from "./screens/allReviews/allReviewsScreen";
import bookNowScreen from "./screens/bookNow/bookNowScreen";
import exploreTripScreen from "./screens/exploreTrip/exploreTripScreen";
import hotelDetailScreen from "./screens/hotelDetail/hotelDetailScreen";
import hotelWithMapScreen from "./screens/hotelWithMap/hotelWithMapScreen";
import mustVisitPlaceScreen from "./screens/mustVisitPlace/mustVisitPlaceScreen";
import paymentScreen from "./screens/payment/paymentScreen";
import popularExperienceScreen from "./screens/popularExperience/popularExperienceScreen";
import popularPlaceScreen from "./screens/popularPlace/popularPlaceScreen";
import notificationScreen from "./screens/notification/notificationScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import inviteFriendsScreen from "./screens/inviteFriends/inviteFriendsScreen";
import travelProCashScreen from "./screens/travelProCash/travelProCashScreen";
import welcomeScreen from "./screens/auth/welcomeScreen";
import verificationScreen from "./screens/auth/verificationScreen";
import registerScreen from "./screens/auth/registerScreen";
import splashScreen from "./screens/splashScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  placeFlow: createSharedElementStackNavigator(
    {
      Splash: splashScreen,
      Onboarding: onboardingScreen,
      Welcome: welcomeScreen,
      Verification: verificationScreen,
      Register: registerScreen,
      BottomTabBar: bottomTabBarScreen,
      PopularPlace: popularPlaceScreen,
      HotelDetail: hotelDetailScreen,
      AllReviews: allReviewsScreen,
      PopularExperience: popularExperienceScreen,
      BookNow: bookNowScreen,
      Payment: paymentScreen,
      HotelWithMap: hotelWithMapScreen,
      ExploreTrip: exploreTripScreen,
      MustVisitPlace: mustVisitPlaceScreen,
      Notification: notificationScreen,
      EditProfile: editProfileScreen,
      InviteFriends: inviteFriendsScreen,
      TravelProCash: travelProCashScreen,
    },
    {
      initialRouteName: 'BottomTabBar',
    }
  ),
},
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
    transitionSpec: {
      duration: 400,
    },
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};
