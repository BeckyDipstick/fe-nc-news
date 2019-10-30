import React from 'react';
import './App.css';
import Homepage from './Components/Homepage';
import { Router } from '@reach/router';
import ArticleList from './Components/ArticleList';
import SingleArticle from './Components/SingleArticle';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommentsForArticle from './Components/CommentsForArticle';
import PostComment from './Components/PostComment';

class App extends React.Component {
	state = {
		user: ''
	};
	getUser = user => {
		this.setState({ user });
	};
	render() {
		return (
			<div className="App">
				<Router>
					<Homepage path="/" getUser={this.getUser} />
					<ArticleList path="/articles" user={this.state.user} />
					<SingleArticle path="/articles/:article_id" user={this.state.user} />
					<ArticleList
						path="/topics/:topic_slug/articles"
						user={this.state.user}
					/>
					<CommentsForArticle
						path="/articles/:article_id/comments"
						user={this.state.user}
					/>
					<PostComment
						path="/articles/:article_id/comments/post_comment"
						user={this.state.user}
					/>
				</Router>
			</div>
		);
	}
}

export default App;
