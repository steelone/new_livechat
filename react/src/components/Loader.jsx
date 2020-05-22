import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
