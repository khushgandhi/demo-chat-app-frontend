import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import apiCall from "../../../../ApiUtill/apiCall";

function SearchAndLoad(props) {
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const getOptions = (str) => {
    setLoading(true);
    apiCall(`users/${str}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setOptions(resp);
        setLoading(false);
      })
      .catch((ex) => {
        console.log(ex);
        setLoading(false);
      });
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}

      onChange={(event, value) => {
        console.log(value);
        props.setReciever(value);
      }}
      autoSelect={true}
      filterOptions={(options, state) => {
        return options;
      }}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Enter atleast 2 char to search"
          label="Selct Participant"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
              </React.Fragment>
            ),
          }}
          onChange={(event) => {
            const val = event.target.value;
            console.log("searching...")
            console.log(val);
            if (val.length > 1) {
              setTimeout(() => {
                getOptions(val);
              }, 500);
            }
            else {
              // console.log("clearing");
              setOptions([]);
            }
          }}
        />
      )}
    />
  );
}

export default SearchAndLoad;
