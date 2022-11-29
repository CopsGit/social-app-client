import React, {useRef, useState} from "react";
import { Input, TextField } from "@material-ui/core";



import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import {Button} from "@mui/material";

const Address = ({chooseAddress}) => {
    // const inputRef = useRef(null);
    const [country, setCountry] = useState("US");
    const { ref: materialRef } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        onPlaceSelected: (place) => console.log(place),
        inputAutocompleteValue: "country",
        options: {
            componentRestrictions: { country },
        },
    });

    const handleAddress = () => {
        alert(country)
    }

    const handleCountry = (e) => {
        console.log(e)
        const shortName = e.address_components.slice(-1);
        setCountry(shortName[0].short_name)
    }

    return (
        <div style={{ width: "250px", display: 'flex',  }}>
            <Input
                fullWidth
                color="secondary"
                inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
                    <Autocomplete
                        apiKey={process.env.GOOGLE_MAPS_API_KEY}
                        {...props}
                        onPlaceSelected={(selected) => handleCountry(selected)}
                    />
                )}
            />
            <Button onClick={handleAddress}>Confirm</Button>
        </div>
    );
};

export default Address;
