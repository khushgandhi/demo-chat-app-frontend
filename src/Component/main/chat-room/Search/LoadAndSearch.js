import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import "./LoadAndSearch.css";
import apiCall from "../../../../ApiUtill/apiCall";

function LoadAndSearch(props) {
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    // console.log(loading);
    if (loading) {
      console.log("options....");
      console.log(options);
      apiCall("users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          setOptions(resp);
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      onOpen={() => {
        setLoading(true);
      }}
      onClose={() => {
        setLoading(false);
      }}
      onChange={(event, value) => {
        console.log(value);
        props.setReciever(value);
      }}
      autoSelect={true}
      filterOptions={(options, state) => {
        console.log(options);
        console.log(state.inputValue);
        return options.filter(
          (option) => option.name.indexOf(state.inputValue) !== -1
        );
      }}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
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
        />
      )}
    />
  );
}

export default LoadAndSearch;
