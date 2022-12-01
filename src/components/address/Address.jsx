import React, {useState} from "react";
import { Input } from "@material-ui/core";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import {Button} from "@mui/material";
import api from "../../helpers/axiosSetting";

const Address = ({curAddress, type}) => {
    const [country, setCountry] = useState("US");
    const accessToken = localStorage.getItem("accessToken")

    const { ref: materialRef } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        onPlaceSelected: (place) => console.log(place),
        inputAutocompleteValue: "country",
        options: {
            componentRestrictions: { country },
        },
    });

    const handleAddress = async () => {
        if (type === 'user'){
            try{
                await api.post('/user/auth/update', {
                    location: country
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                window.location.reload()
            } catch (e) {
                console.log(e)
            }
        }
        else {
            try{
                await api.post('/user/auth/update', {
                    address: country
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    const handleCountry = async (e) => {
        console.log(e)
        const shortName = e.address_components.slice(-1);
        setCountry(shortName[0].short_name)
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', padding:'15px'}}>
            <Input
                fullWidth
                color="secondary"
                sx={{
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before":{
                        borderBottom: 'none'
                    },
                    "& .MuiInput-underline": {
                        "&:before": {
                            borderBottom: "none",
                        },
                        "&:hover:not(.Mui-disabled):before": {
                            borderBottom: "none",
                        }
                    }
                }}
                placeholder={curAddress? curAddress : "Address"}
                inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
                    <Autocomplete
                        apiKey={'AIzaSyDYrYPIgl7BayCY71rFeXdWomcWw9OdvSQ'}
                        {...props}
                        onPlaceSelected={(selected) => handleCountry(selected)}
                    />
                )}
            />
            <Button onClick={handleAddress}>Submit</Button>
        </div>
    );
};

export default Address;
