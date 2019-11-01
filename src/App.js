import React from 'react';
import './App.css';
import Homepage from './Components/Homepage';
import { Router } from '@reach/router';
import ArticleList from './Components/ArticleList';
import SingleArticle from './Components/SingleArticle';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommentsForArticle from './Components/CommentsForArticle';
import PostComment from './Components/PostComment';
import TAndCs from './Components/TAndCs';
import NotFound from './Components/NotFound';

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
		if (user) this.setState({ user });
	}
	render() {
		return (
			<div className="App">
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
					<TAndCs path="articles/:article_id/comments/post_comment/t&cs" />
				</Router>
			</div>
		);
	}
}

export default App;
