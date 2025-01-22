const APIKEY = 'FTmHwtJOqb';

const baseURL = 'https://comp2140.uqcloud.net/api/';

//Fetch call for getting the locations from the api.
export const fetchLocations = async () => {
    try {
        const url = `${baseURL}location/?api_key=${APIKEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching locations:", error);
        return [];
    }
};
