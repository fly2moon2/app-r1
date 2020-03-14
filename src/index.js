//import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import PropTypes from "prop-types";
import * as serviceWorker from './serviceWorker';

const node=document.getElementById('root');

const arr=[1,2,3,4];
//const sumfn = (subtotal,increment) => (subtotal * increment);
const sumarr=arr.reduce((a,b)=>(a+b));
//const summarr=arr.reduce(sumfn());
const sumarr3=arr.reduce((a,b,c)=>(a+b+c));

const strarr=['a','m','e','r','p','e','a','c','e'];
const concatstr=strarr.reduce((a,b)=>(a+b));
const concatstr3=strarr.reduce((a,b,c)=>(a+b+c+'!'));

const data = {
  post: {
    id: 123,
    content:
      "What we hope ever to do with ease, we must first learn to do with diligence. — Samuel Johnson",
    user: "Mark Thomas",
    flag: "normal"
  },
  comments: [
    {
      id: 0,
      user: "David",
      content: "such. win."
    },
    {
      id: 1,
      user: "Haley",
      content: "Love it."
    },
    {
      id: 2,
      user: "Peter",
      content: "Who was Samuel Johnson?"
    },
    {
      id: 3,
      user: "Mitchell",
      content: "@Peter get off Letters and do your homework"
    },
    {
      id: 4,
      user: "Peter",
      content: "@mitchell ok :P"
    }
  ]
};

class Post extends Component {
    render() {
      return React.createElement(
        "div",
        {
          className: "post" //#C
        },
        React.createElement(
          "h2",
          {
            className: "postAuthor",
            id: this.props.id
          },
          this.props.user, //#D
          React.createElement(
            "span",
            {
              className: "postBody" //#E
            },
            this.props.content //#F
          ),
          React.createElement(
            "span",
            {
                className: "postFlag" //#E
              },
            this.props.flag
          )
        )
      );
    }
  }


  Post.propTypes = {
    user: PropTypes.string.isRequired, //#G
    content: PropTypes.string.isRequired, //#G
    id: PropTypes.number.isRequired, //#G
    flag: PropTypes.string.isRequired
  };


class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.user + " : "}</h2>
        <span className="commentContent">{this.props.content}</span>
      </div>
    );
  }
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
};

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      user: ""
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserChange(event) {
    this.setState({
      user: event.target.value
    });
  }
  handleTextChange(event) {
    this.setState({
      content: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onCommentSubmit({
      user: this.state.user.trim(),
      content: this.state.content.trim()
    });
    this.setState({
      user: "",
      content: ""
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="createComment">
        <input
          value={this.state.user}
          onChange={this.handleUserChange}
          placeholder="Your name"
          type="text"
        />
        <input
          value={this.state.content}
          onChange={this.handleTextChange}
          placeholder="Thoughts?"
          type="text"
        />
        <button type="submit">Post</button>
      </form>
    );
  }
}

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  handleCommentSubmit(comment) {
    const comments = this.state.comments;
    comment.id = Date.now();
    const newComments = comments.concat([comment]);
    this.setState({
      comments: newComments
    });
  }
  render() {
    return (
      <div className="commentBox">
        <Post
          id={this.props.post.id}
          content={this.props.post.content}
          user={this.props.post.user}
          flag={this.props.post.flag}
        />
        {this.state.comments.map(function(comment) {
          return (
            <Comment
              key={comment.id}
              content={comment.content}
              user={comment.user}
            />
          );
        })}
        <CreateComment onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

CommentBox.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object)
};

//ReactDOM.render(<CommentBox comments={data.comments} post={data.post} />, node);

  
  export const AppPost = React.createElement(Post, {
    id: 1, //#H
    content: " said: This is more than a post! " + sumarr.toString() + concatstr + sumarr3.toString() + concatstr3, //#H
    user: "mark", //#H
    flag: "urgent"
  });


//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(AppPost, node);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
