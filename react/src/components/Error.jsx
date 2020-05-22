import React from "react";
import Alert from '@material-ui/lab/Alert';


export const Error = ({ message }) => (
  <Alert severity="error">
    {message}
  </Alert>
);