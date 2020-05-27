import React from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../../websocket";
import { Grid, Button, TextField } from "@material-ui/core";
import Message from "../Message";
import Loader from "../Loader";
import { openChat } from "../../store/actions/app";
import ChatPageFooter from "./ChatPageFooter";

class ChatPage extends React.Component {
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
    this.state = {
      message: "",
      loading: false,
    };
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  componentDidMount() {
    !this.state.loading && this.state.messages && this.scrollToBottom();
  }
  componentDidUpdate() {
    !this.state.loading && this.state.messages && this.scrollToBottom();
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
    return messages.map((item) => (
      <Message
        key={item.id}
        author={item.author}
        content={item.content}
        timestamp={item.timestamp}
      />
    ));
  };
  keyPress = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.sendMessageHandler(e);
    }
  };
  newChat = () => {
    WebSocketInstance.disconnect();
    this.setState({ loading: true });
    this.props.openChat(this.props.username, this.props.match.params.chatID);
    setTimeout(() => {
      this.props.history.push("/");
    }, 1700);
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
        {this.state.loading && <Loader />}
        {messages && !this.state.loading && (
          <>
            {this.renderChatPageContent(messages)}
            <ChatPageFooter />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapStateToProps, { openChat })(ChatPage);
