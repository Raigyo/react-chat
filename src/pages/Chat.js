//Chat page

import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default class Chat extends Component {
  //initial state of the app
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      //reference to the chats path in the database
      //.on: any time a new value is added to the database, the client app is updated in real-time      
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        //What is returned from the database is an array-like object that we loop through and push each object into an arra
        snapshot.forEach((snap) => {
          //We listen to the value event which is triggered anytime a new value is added to the chats node
          chats.push(snap.val());
        });
        //Then, we set the chats state variable to our resulting array
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      //If there is an error, we set the readError state variable to the error message
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  //gets the value from the input field and sets on our state variable
  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }//\handleChange

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid
      });
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }//\async handleSubmit

  /*We set any previous errors to null. 
  We create a reference to the chats node in the database and use push() 
  to create a unique key and pushe the object to it.*/
  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }//\formatTime

  //This renders the array of chats. We render the email of the currently logged in user.
  render() {
    return (
      <div>
        <Header />
        <div className="chat-area" ref={this.myRef}>
          {/* loading indicator */}
          {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}
          {/* chat area: form with an input field that accepts a message and a button to send the message to the chat */}
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
              {chat.content}
              <br />
              <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
            </p>
          })}
        </div>
        <form onSubmit={this.handleSubmit} className="mx-3">
          <textarea className="form-control" name="content" onChange={this.handleChange} value={this.state.content}></textarea>
          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
          <button type="submit" className="btn btn-primary px-5 mt-4">Send</button>
        </form>
        <div className="py-5 mx-3">
          Login in as: <strong className="text-info">{this.state.user.email}</strong>
        </div>
      </div>
    );//\return
  }//\render
}//\class Chat