import React from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../../websocket";
import { Grid, Button, TextField } from "@material-ui/core";
import Message from "../Message";
import Loader from "../Loader";
import { closeChat } from "../../store/actions/app";

class ChatPage extends React.Component {
  state = { message: "" };

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(
        this.setMessages.bind(this),
        this.addMessage.bind(this)
      );
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
    this.state.messages && this.scrollToBottom();
  }
  componentDidUpdate() {
    this.state.messages && this.scrollToBottom();
  }
  componentWillReceiveProps() {
    this.initialiseChat();
  }
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
      chatID: this.props.match.params.chatID,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  renderMessages = (messages) => {
    return messages.map((item, i, arr) => (
      <Message key={item.id} arr={arr} item={item} />
    ));
  };
  keyPress = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.sendMessageHandler(e);
    }
  };
  newChat = () => {
    WebSocketInstance.disconnect();
    this.props.history.push("/");
    const { closeChat } = this.props;
    closeChat(this.props.username);
  };

  renderChatPageContent = (messages) => {
    return (
      <>
        <Button variant="contained" color="secondary" onClick={this.newChat}>
          NEW CHAT
        </Button>
        <Grid item xs={12}>
          {this.renderMessages(messages)}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </Grid>
        <Grid container justify="flex-end">
          <form onSubmit={this.sendMessageHandler} onKeyDown={this.keyPress}>
            <Grid direction="column" container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  id="standard-multiline-flexible"
                  name="title"
                  label="Message"
                  multiline
                  required
                  type="text"
                  autoFocus
                  rows={2}
                  rowsMax={7}
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
  };
  render() {
    const messages = this.state.messages;

    return (
      <>
        {!messages && <Loader />}
        {messages && this.renderChatPageContent(messages)}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapStateToProps, { closeChat })(ChatPage);
