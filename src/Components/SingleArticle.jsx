import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from '@reach/router';
import Voter from './Voter';

class SingleArticle extends React.Component {
	state = {
		article: {},
		isLoading: true,
		user: this.props.user
	};
	componentDidMount() {
		return axios
			.get(
				`https://rebecca-nc-news.herokuapp.com/api/articles/${this.props.article_id}`
			)
			.then(({ data }) => {
				this.setState({ article: data.article, isLoading: false });
			});
	}
	render() {
		if (this.state.isLoading) return <p>Loading....</p>;
		const article = this.state.article;
		return (
			<main>
				<h2>{article.title}</h2>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/articles">Articles</Link>
				</nav>
				<h3>By {article.author}</h3>
				<h4>From topic {article.topic}</h4>
				<p>{article.body}</p>
				<Voter path={`articles/${article.article_id}`} votes={article.votes} />
				<Link
					to={`/articles/${article.article_id}/comments`}
					user={this.state.user}
				>
					<Button variant="outline-primary" size={'sm'}>
						Comments
					</Button>
				</Link>
				<Link
					to={`/articles/${article.article_id}/comments/post_comment`}
					user={this.state.user}
				>
					<Button variant="outline-primary" size={'sm'}>
						Post Comment
					</Button>
				</Link>
			</main>
		);
	}
}

export default SingleArticle;
