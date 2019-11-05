import React from 'react';
import { Card, Button, CardDeck } from 'react-bootstrap';
import Voter from './Voter';
import formatDate from '../utils';

function CommentCards(props) {
	const comments = props.comments;
	const user = props.user;
	return (
		<>
			<CardDeck style={{ display: 'inline-block' }}>
				{comments.map(comment => {
					return (
						<Card
							style={{ display: 'inline-block' }}
							className={'article-cards'}
							key={comment.comment_id}
						>
							<Card.Body>
								<Card.Title>{comment.author}</Card.Title>
								<Card.Subtitle>For article {comment.article_id} </Card.Subtitle>
								<Card.Text>{comment.body}</Card.Text>
								<Voter
									id={comment.comment_id}
									votes={comment.votes}
									path={`comments/${comment.comment_id}`}
								/>
								<Card.Text>
									Written on {formatDate(comment.created_at)}
								</Card.Text>
								{user === comment.author ? (
									<Button
										variant="danger"
										size={'sm'}
										onClick={() => {
											props.handleDelete(comment.comment_id, comment.author);
										}}
									>
										Delete
									</Button>
								) : null}
							</Card.Body>
						</Card>
					);
				})}
			</CardDeck>
		</>
	);
}

export default CommentCards;
