import { IconButton, TextField } from "@mui/material";
import React, { useRef } from "react";
import "./MessageTextBox.css";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";

export default function MessageTextBox(props) {
 
const textRef = useRef('')

const WhiteBorderTextField = styled(TextField)`

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border: 1px solid black !important;
    }
  }
  border: 1px solid black !important;
`;
  return (
    <div className="SendTextBox">
      <WhiteBorderTextField
        multiline
        maxRows={4}
        fullWidth
        inputRef={textRef}
        placeholder="Type a message"
        size="small"
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                props.sendMessage(textRef.current.value);
              }}
            >
              <SendIcon />
            </IconButton>
          ),
          style:{fontWeight: 'bold' , fontSize: '1rem'}
        }}
      />
      {/* <DeleteIcon/> */}
      {/* <input type="text" className="SendTextBox" /> */}
    </div>
  );
}
