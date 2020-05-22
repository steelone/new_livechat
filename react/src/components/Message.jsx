import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { Paper, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  timeText: {
    display: "flex",
    alignItems: "flex-end",
    flexGrow: 1,
  },
}));

const Message = (item, i, arr) => {
  const classes = useStyles();
  console.log("message ===== ", item);
  console.log("item ===== ", item.item.content);
  console.log("author", item.item.author);

  const renderTimestamp = (timestamp) => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "just now...";
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar
              alt="Cindy Baker"
              src="https://assets.dryicons.com/uploads/icon/svg/5598/cfee5087-8773-4fb3-ac5e-63372d889b1f.svg"
            />
            <Typography>{item.item.author}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{item.item.content}</Typography>
          </Grid>
        </Grid>
        <Grid className={classes.timeText} item xs={4}>
          <Typography>{renderTimestamp(item.item.timestamp)}</Typography>
        </Grid>
      </Paper>
    </>
  );
};

export default Message;
