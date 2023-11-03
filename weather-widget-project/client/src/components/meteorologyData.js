import React from 'react';
import "./meteorologyData.css"

export default function MeteorologyData(props) {
    const city = props.city;
    const handleError = props.handleError;
    const refreshTime = 1800000; //30 minutes in milliseconds

    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(false);

    // Given a string put the first letter in upper case, for example: lisbon -> Lisbon
    const capitalizeFirstLetter = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    React.useEffect(() => {
        // Handle error to show error message
        const onError = (hasError) => {
            handleError(hasError);
            setError(hasError);
        }
        // Fetch weather information
        const fetchMeteorologyData = async () => {
            try {
                await fetch("/" + city)
                    .then((res) => res.json())
                    .then((data) => setData(data.meteorology));
                
                onError(false);
            } catch (error) {
                onError(true);
            }
        }
        fetchMeteorologyData();

        // Update the weather information every 30 minutes
        const timer = setInterval(fetchMeteorologyData, refreshTime);

        return () => clearInterval(timer)
    }, [city, data, handleError]);

    return (
        <div>
            <h2 className="meteorologyData">{capitalizeFirstLetter(city)}</h2>
            {!error && <h3 className="meteorologyData">{!data ? "Loading..." : data + "ºF"}</h3>}
            {error && <h3 className="meteorologyData">Loading...</h3>}
        </div>
    )
}
