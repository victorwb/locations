import MapView, { Marker } from "react-native-maps";
import React, { Component } from "react";

class GoogleMap extends Component {
    render() {
        const {
            latitude,
            longitude,
            height,
        } = this.props;
        return (
            <MapView
                style={{ height: height }}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.10,
                    longitudeDelta: 0.10,
                }}
            >
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                />
            </MapView>
        )
    }
}

export default GoogleMap;