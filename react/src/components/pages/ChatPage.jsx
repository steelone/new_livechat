import React from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../../websocket";
import axios from "axios";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import Message from "../Message";

class ChatPage extends React.Component {
  state = { message: "" };

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(
        this.setMessages.bind(this),
        this.addMessage.bind(this)
      );
      console.log("this.props", this.props);
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

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  componentDidMount() {
    if (this.props.token !== null && this.props.username !== null) {
      this.getUserChats(this.props.token, this.props.username);
    }
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== null && newProps.username !== null) {
      this.getUserChats(newProps.token, newProps.username);
    }
    this.initialiseChat();
  }

  getUserChats = (token, username) => {
    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Token ${token}`,
    // };
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

  renderMessages = (messages) => {
    return messages.map((item, i, arr) => (
      <Message key={item.id} arr={arr} item={item} />
    ));
  };

  render() {
    const messages = this.state.messages;
    return (
      <>
        <Grid item xs={12}>
          {messages && this.renderMessages(messages)}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </Grid>
        <Grid container justify="flex-end">
          <form onSubmit={this.sendMessageHandler}>
            <Grid direction="column" container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  id="standard-multiline-flexible"
                  name="title"
                  label="Message"
                  multiline
                  required
                  type="text"
                  rowsMax={4}
                  value={this.state.message}
                  onChange={this.messageChangeHandler}
                  placeholder="Your message..."
                />
              </Grid>
              <Grid item xs={8}>
                <Button variant="contained" color="primary" type="submit">
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("ChatPage", state.auth.username);
  return {
    chats: [],
    username: state.auth.username,
  };
};

export default connect(mapStateToProps)(ChatPage);
