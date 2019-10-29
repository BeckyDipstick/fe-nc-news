import React from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from '@reach/router';

class CommentsForArticle extends React.Component {
	state = {
		comments: [],
		isLoading: true
	};
	componentDidMount() {
		return axios
			.get(
				`https://rebecca-nc-news.herokuapp.com/api/articles/${this.props.article_id}/comments`
			)
			.then(({ data }) => {
				this.setState({ comments: data.comments, isLoading: false });
			});
	}
	render() {
		const id = this.props.article_id;
		if (this.state.isLoading) return <p>Loading....</p>;
		const comments = this.state.comments;
		return (
			<main>
				<h1>Comments will hopefully live here....</h1>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/articles">Articles</Link>
					<Link to={`/articles/${id}`}>Back to article</Link>
				</nav>
				<Card style={{ width: '20rem' }}>
					{comments.map(comment => {
						return (
							<Card.Body key={comment.comment_id} className={'article-cards'}>
								<Card.Title>{comment.author}</Card.Title>
								<Card.Subtitle>For article {comment.article_id}</Card.Subtitle>
								<Card.Text>
									{comment.body}
									votes: {comment.votes}
								</Card.Text>
								<Button variant="outline-success" size={'sm'}>
									Upvote
								</Button>
								<Button variant="outline-danger" size={'sm'}>
									Downvote
								</Button>
							</Card.Body>
						);
					})}
				</Card>
			</main>
		);
	}
}

export default CommentsForArticle;
