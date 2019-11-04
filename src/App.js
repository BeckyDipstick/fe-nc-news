import React from 'react';
import Homepage from './Components/Homepage';
import { Router } from '@reach/router';
import ArticleList from './Components/ArticleList';
import SingleArticle from './Components/SingleArticle';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommentsForArticle from './Components/CommentsForArticle';
import PostComment from './Components/PostComment';
import Terms from './Components/Terms';
import NotFound from './Components/NotFound';
import './App.css';
import Header from './Components/Header';
import Login from './Components/Login';

class App extends React.Component {
	state = {
		user: ''
	};
	getUser = user => {
		this.setState({ user });
		localStorage.setItem('user', JSON.stringify(user));
	};
	componentDidMount() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) this.setState({ user, isLoading: false });
	}
	render() {
		return (
			<div className="App">
				<Header user={this.state.user} />
				<Login getUser={this.getUser} />
				<Router>
					<NotFound default />
					<Homepage path="/" getUser={this.getUser} user={this.state.user} />
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
					<Terms path="/t&cs" />
				</Router>
			</div>
		);
	}
}

export default App;
