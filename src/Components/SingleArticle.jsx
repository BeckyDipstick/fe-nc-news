import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from '@reach/router';

class SingleArticle extends React.Component {
	state = {
		article: {},
		isLoading: true
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
				<h1>{article.title}</h1>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/articles">Articles</Link>
				</nav>
				<h2>By {article.author}</h2>
				<h3>From topic {article.topic}</h3>
				<p>{article.body}</p>
				<p>Number of votes: {article.votes}</p>
				<Link to={`/articles/${article.article_id}/comments`}>
					<Button variant="outline-primary" size={'sm'}>
						Comments
					</Button>
				</Link>
				<Button variant="outline-success" size={'sm'}>
					Upvote
				</Button>
				<Button variant="outline-danger" size={'sm'}>
					Downvote
				</Button>
				<Button variant="outline-primary" size={'sm'}>
					Post Comment
				</Button>
			</main>
		);
	}
}

export default SingleArticle;
