// Import React Native
import React, { useState, useEffect } from "react";
import { PermissionsAndroid, StyleSheet, Appearance} from "react-native";
import { Platform } from 'react-native'; // Import Platform from react-native
// Import React Native Maps
import MapView, { Marker, Circle } from "react-native-maps";
import MapContext from '../components/MapContext';
// Import React Native Geolocation
import Geolocation from "@react-native-community/geolocation";
import { getDistance } from "geolib";

// Import Locations Data
import { fetchLocations } from "../data/locations";


// Define Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nearbyLocationSafeAreaView: {
        backgroundColor: "black",
    },
    nearbyLocationView: {
        padding: 20,
    },
    nearbyLocationText: {
        color: "white",
        lineHeight: 25
    }
});
const colorScheme = Appearance.getColorScheme();
let NerLov =""; 
let Lname="";
let locationID="";

export function giveValue() {
    return {
        message: NerLov,
        name: nearbyLocationData.name,
        locationID: nearbyLocationData.locationID
    };
}
const initialMapState = {
    locations: [],
    userLocation: {
      latitude: -27.499526188402154,
      longitude: 152.9728129460468,
    },
    nearbyLocation: {},
    locationPermission: false, // Add this line to set initial locationPermission
  };
// Main component for displaying the map and markers
 export default function ShowMap() {
    const [mapState, setMapState] = useState(initialMapState);
    const [locState, setlocState] = useState(false);
    const [isNearby, setIsNearby] = useState("");
    const [isName, setIsName] = useState("");
    const [isID, setIsID] = useState("");
    const [locations, setLocations] = useState([]);
    let updatedLocations = []; // declare the variable outside useEffect
    useEffect(() => {
        
        async function requestAndroidLocationPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "This app will put your location on the map.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Permission before",mapState)
                     setlocState(true);
                }
                console.log("MAAA",mapState)
            }
            catch(error) {
                console.warn(error);
            }
        };
        
        if(Platform.OS === "android") {
            requestAndroidLocationPermission();
        }
        else {
            setlocState(true);
        }
        
    }, []);
    useEffect(() => {
    const fetchLocationData = async () => {
        console.log("newDa",mapState)
        const data = await fetchLocations();
        updatedLocations = data.map(location => {
            const coordinates = {
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude),
            };
            return { ...location, coordinates };
        });
        setLocations(updatedLocations);
        console.log('local',locState)
        const initialMapState = {
            locationPermission: locState,
            locations: updatedLocations,
            userLocation: {
                latitude: -27.499526188402154,
                longitude: 152.9728129460468,
            },
            nearbyLocation: {}
        };
        console.log("Eivdddfe", initialMapState,mapState);
        setMapState(initialMapState);
    };    
    fetchLocationData();
}, [locState]);
    
    // Function to retrieve location nearest to current user location
    function calculateDistance(userLocation) {
        let count = 0;
        let nearbyLocationData = {};
        const nearestLocations = mapState.locations.map(location => {
            const metres = getDistance(
                userLocation,
                location.coordinates
            );
            location["distance"] = {
                metres: metres,
                nearby: metres <= 100 ? true : false
            };
            return location;
        }).sort((previousLocation, thisLocation) => {
            return previousLocation.distance.metres - thisLocation.distance.metres;
        });
        nearestLocations.forEach(location => {
            if (location.distance.nearby) {
                count = count + 1;
                nearbyLocationData = {
                    name: location.name,
                    locationID: location.id
                };
            }
        });
        if (count > 0) {
            const message = 'There is music Nearby';
            setIsNearby(message);
            setIsName(nearbyLocationData.name); // Set the name
            setIsID(nearbyLocationData.locationID); // Set the location ID
        } else {
            setIsNearby("");
            setIsName(''); // Reset the name
            setIsID(''); // Reset the location ID
        }
        return nearestLocations.shift();
    }
    const { setNerLov,setLName,setLocationID } = React.useContext(MapContext);

    useEffect(() => {
        setNerLov(isNearby);
        setLName(isName);
        setLocationID(isID);
      }, [isNearby, isName, isID]);
    
    // Only watch the user's current location when device permission granted
    if(mapState.locationPermission) {
        Geolocation.watchPosition(
            position => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                const nearbyLocation = calculateDistance(userLocation);
                setMapState({
                    ...mapState,
                    userLocation,
                    nearbyLocation: nearbyLocation
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true }
        );
    }
    
    
    return (
        <>
            {locations.length > 0 && (
                <MapView
                    camera={{
                        center: mapState.userLocation,
                        pitch: 0, // Angle of 3D map
                        heading: 0, // Compass direction
                        altitude: 3000, // Zoom level for iOS
                        zoom: 15 // Zoom level For Android
                    }}
                    showsUserLocation={mapState.locationPermission}
                    style={styles.container}
                >
                    {mapState.locations.map(location => (
                        <Circle
                            key={location.id}
                            center={location.coordinates}
                            radius={100}
                            strokeWidth={3}
                            strokeColor="#A42DE8"
                            fillColor={colorScheme == "dark" ? "rgba(128,0,128,0.5)" : "rgba(210,169,210,0.5)"}
                        />
                    ))}
                </MapView>
            )}
        </>
    );
    
}
