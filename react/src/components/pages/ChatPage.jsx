import React from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../../websocket";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

import {
  Grid,
  Card,
  Typography,
  Divider,
  CardMedia,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  replies: {
    justifyContent: "flex-start",
  },
  sent: {
    justifyContent: "flex-end",
  },
  card: {
    display: "flex",
  },
  cardDetailes: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

class ChatPage extends React.Component {
  state = { message: "" };

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(
        this.setMessages.bind(this),
        this.addMessage.bind(this)
      );
      console.log("username", this.props.username);
      console.log("params.chatID", this.props.match.params.chatID);
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.match.params.chatID
      );
    });
    WebSocketInstance.connect(this.props.match.params.chatID);
  }

  constructor(props) {
    super(props);
    this.initialiseChat();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.token !== null && newProps.username !== null) {
      this.getUserChats(newProps.token, newProps.username);
    }
  }

  componentDidMount() {
    if (this.props.token !== null && this.props.username !== null) {
      this.getUserChats(this.props.token, this.props.username);
    }
  }

  getUserChats = (token, username) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`http://127.0.0.1:8000/chat/?username=${username}`)
      .then((res) => this.setState({ chats: res.data }));
  };

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function () {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message] });
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse() });
  }

  messageChangeHandler = (event) => {
    this.setState({ message: event.target.value });
  };

  sendMessageHandler = (e) => {
    e.preventDefault();
    const messageObject = {
      from: this.props.username,
      content: this.state.message,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  renderTimestamp = (timestamp) => {
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

  renderMessages = (messages) => {
    const classes = useStyles();

    const currentUser = this.props.username;
    return messages.map((message, i, arr) => (
      <div style={{ paddingBottom: 20 }} key={message.id}>
        {/* <li
          style={{ marginBottom: arr.length - 1 === i ? "300px" : "15px" }}
          className={message.author === currentUser ? "sent" : "replies"}
        >
          <img src="http://emilcarlsson.se/assets/mikeross.png" />
          <img alt="avatar" src={avatar} />
          <img
            alt="avatar"
            src="https://assets.dryicons.com/uploads/icon/svg/5598/cfee5087-8773-4fb3-ac5e-63372d889b1f.svg"
          />
          <p>
            {message.content}
            <br />
            <small></small>
          </p>
        </li> */}
        <Grid container item xs={12} spacing={3}>
          <Card className={classes.card}>
            <div className={classes.cardDetailes}>
              <Typography variant="h3" gutterBottom>
                {message.content}
              </Typography>
              <Divider />
              <Typography variant="subtitle1" gutterBottom>
                {this.renderTimestamp(message.timestamp)}
                {/* {currentUser || message.user} */}
                {currentUser}
              </Typography>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://assets.dryicons.com/uploads/icon/svg/5598/cfee5087-8773-4fb3-ac5e-63372d889b1f.svg"
              title="Avatar"
            />
          </Card>
        </Grid>
      </div>
    ));
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  //UseEffecet
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(newProps) {
    this.initialiseChat();
  }

  render() {
    // const mockMessages = [
    //   {
    //     // from: this.props.username,
    //     user: "Peter",
    //     content: "mock message 1",
    //     timestamp: "2020",
    //   },
    //   {
    //     user: "Vlad",
    //     content: "mock message 2",
    //     timestamp: "2020",
    //   },
    //   {
    //     user: "Peter",
    //     content: "mock message 3",
    //     timestamp: "2020",
    //   },
    // ];
    // const messages = [...this.state.messages, mockMessages];
    const messages = this.state.messages;
    return (
      <>
        <Grid container spacing={2}>
          {messages && this.renderMessages(messages)}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </Grid>
        {/* <PostForm /> */}
        <div className="message-input">
          <form onSubmit={this.sendMessageHandler}>
            <div className="wrap">
              <input
                onChange={this.messageChangeHandler}
                value={this.state.message}
                required
                id="chat-message-input"
                type="text"
                placeholder="Write your message..."
              />
              <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
              <Button
                id="chat-message-submit"
                variant="contained"
                color="primary"
              >
                <Typography>Send</Typography>
              </Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps)(ChatPage);
