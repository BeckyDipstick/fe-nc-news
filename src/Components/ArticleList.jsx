import React from 'react';
import { Link } from '@reach/router';
import Loading from './Loading';
import Sorting from './Sorting';
import ErrorHandler from './ErrorHandler';
import * as api from '../api';
import ArticleCards from './ArticleCards';
class ArticleList extends React.Component {
	state = {
		isLoading: true,
		articles: [],
		errMsg: null,
		errStatus: null
	};

	fetchArticles = (sortColumn, order = 'desc') => {
		const topic_slug = this.props.topic_slug;
		api
			.getArticles(sortColumn, order, topic_slug)
			.then(articles => {
				this.setState({
					articles,
					isLoading: false
				});
			})
			.catch(err => {
				this.setState({
					errMsg: err.response.data.msg,
					errStatus: err.response.status,
					isLoading: false
				});
			});
	};

	componentDidMount() {
		this.fetchArticles();
	}
	render() {
		const user = this.props.user;
		const { errStatus, errMsg } = this.state;
		if (errStatus)
			return <ErrorHandler errStatus={errStatus} errMsg={errMsg} />;
		if (this.state.isLoading)
			return <Loading isLoading={this.state.isLoading} />;
		const articles = this.state.articles;
		const topic = this.props.topic_slug;
		return (
			<>
				<header>
					{topic ? <h1>{topic} Articles</h1> : <h1>All Articles</h1>}
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
					</ul>
				</header>
				<main>
					<Sorting fetchArticles={this.fetchArticles} />
					<ArticleCards articles={articles} user={user} />
				</main>
			</>
		);
	}
}

export default ArticleList;
