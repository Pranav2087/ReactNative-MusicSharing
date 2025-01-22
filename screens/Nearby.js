import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, Text, Image } from "react-native";

import { colors, fonts, sizes } from "../data/theme";
import icons from "../data/icons";
import MapContext from '../components/MapContext';


const APIKEY = "FTmHwtJOqb";
const baseURL = "https://comp2140.uqcloud.net/api/";

async function getSampleID(loc_ID) {
    const url = `${baseURL}sampletolocation/?api_key=${APIKEY}&location_id=${loc_ID}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

async function getSample(sam_ID) {
    const url = `${baseURL}sample/${sam_ID}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

function Nearby() {
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const [sampleIDs, setSampleIDs] = useState([]);
    const [samplesData, setSamplesData] = useState([]);
    const {Lname,locationID } = React.useContext(MapContext);
    useEffect(() => {
        const fetchData = async () => {
            if (!locationID) {
                setNearbyLocations([]);
                setSampleIDs([]);
                setSamplesData([]);
            } else {
                const data = await getSampleID(locationID);
                setNearbyLocations(data);
                const ids = data.map((item) => item.sample_id);
                setSampleIDs(ids);
            }
        };
        fetchData();
    }, [locationID]);
    

    useEffect(() => {
        const fetchSampleData = async () => {
            const sampleData = await Promise.all(sampleIDs.map((id) => getSample(id)));
            setSamplesData(sampleData);
        };
        if (sampleIDs.length > 0) {
            fetchSampleData();
        }
    }, [sampleIDs]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Image source={icons.pin} style={{ top: 10, left: 50, width: 55, height: 100 }} />
                <Text style={{ marginRight: 10, marginTop: 10 }}>{Lname}</Text>
            </View>
            <View style={{ marginTop: 60 }} />
            <FlatList
                style={{ marginLeft: 20, marginRight: 20 }}
                data={samplesData}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 40 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text>{item.name}</Text>
                            <Text>{item.datetime.slice(0, 10)}</Text>
                        </View>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }} />
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}

export default Nearby;

