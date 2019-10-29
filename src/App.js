import React from 'react';
import './App.css';
import Homepage from './Components/Homepage';
import { Router } from '@reach/router';
import ArticleList from './Components/ArticleList';
import SingleArticle from './Components/SingleArticle';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommentsForArticle from './Components/CommentsForArticle';
import PostComment from './Components/PostComment';

function App() {
	return (
		<div className="App">
			<Router>
				<Homepage path="/" />
				<ArticleList path="/articles" articles />
				<SingleArticle path="/articles/:article_id" />
				<ArticleList path="/topics/:topic_slug/articles" />
				<CommentsForArticle path="/articles/:article_id/comments" />
				<PostComment path="/articles/:article_id/comments" />
			</Router>
		</div>
	);
}

export default App;
