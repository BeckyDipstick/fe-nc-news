import React from 'react';
import axios from 'axios';
import { Card, Button, CardDeck } from 'react-bootstrap';
import { Link } from '@reach/router';
import Voter from './Voter';

class CommentsForArticle extends React.Component {
	state = {
		comments: [],
		isLoading: true,
		user: this.props.user
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
					<Link to="/" user={this.state.user}>
						Home
					</Link>
					<Link to="/articles" user={this.state.user}>
						Articles
					</Link>
					<Link to={`/articles/${id}`} user={this.state.user}>
						Back to article
					</Link>
				</nav>
				<CardDeck style={{ display: 'flex', flexDirection: 'row' }}>
					<Card style={{ flex: 1 }}>
						{comments.map(comment => {
							return (
								<Card.Body key={comment.comment_id} className={'article-cards'}>
									<Card.Title>{comment.author}</Card.Title>
									<Card.Subtitle>
										For article {comment.article_id}
									</Card.Subtitle>
									<Card.Text>{comment.body}</Card.Text>
									<Voter
										id={comment.comment_id}
										votes={comment.votes}
										path={`comments/${comment.comment_id}`}
									/>
									<Button variant="danger" size={'sm'}>
										Delete
									</Button>
								</Card.Body>
							);
						})}
					</Card>
				</CardDeck>
			</main>
		);
	}
}

export default CommentsForArticle;
