import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './NewPost.css';
import axios from 'axios';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount () {
        console.log(this.props);
    }

    postDataHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        axios.post('/posts', post)
            .then(response => {
                console.log(response);
                //this.setState({submitted: true});       /*using the state (in this case, the Redirect) replaces the current page so moving back to the previous page is not possible*/
                this.props.history.push('/posts');    /*history through push adds the current page to the stack so it allows to move back to the previous page*/
                //this.props.history.replace('/posts');    /*history through replace works the same way as Redirect; it doesnt allow moving back to the previous page*/
            });
    }

    render () {
        let redirect = null;
        if (this.state.submitted){
            redirect = <Redirect to="/posts"/>
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;