import React from 'react';
import { Card, Button, CardDeck } from 'react-bootstrap';
import { Link } from '@reach/router';
import Voter from './Voter';

function ArticleCards(props) {
	const articles = props.articles;
	const user = props.user;
	return (
		<CardDeck style={{ display: 'inline-block' }}>
			{articles.map(article => {
				return (
					<Card
						className={'article-cards'}
						style={{ display: 'inline-block' }}
						key={article.article_id}
					>
						<Card.Body>
							<Card.Title>{article.title}</Card.Title>
							<Card.Subtitle>By {article.author}</Card.Subtitle>
							<Card.Text>Article from {article.topic}</Card.Text>
							<Card.Text>
								Article has {article.comment_count} comments
							</Card.Text>
							<Link to={`/articles/${article.article_id}`}>
								<Button
									variant="outline-primary"
									size={'sm'}
									className={'card-buttons'}
								>
									See Full Article
								</Button>
							</Link>
							<Link to={`/articles/${article.article_id}/comments`} user={user}>
								<Button
									variant="outline-primary"
									size={'sm'}
									className={'card-buttons'}
								>
									See Comments For Article
								</Button>
							</Link>
							<Link
								to={`/articles/${article.article_id}/comments/post_comment`}
								user={user}
							>
								{user ? (
									<Button
										variant="outline-primary"
										size={'sm'}
										className={'card-buttons'}
									>
										Post Comment
									</Button>
								) : null}
							</Link>
							<Voter
								id={article.article_id}
								votes={article.votes}
								path={`articles/${article.article_id}`}
							/>
							<Card.Text>Written on: {article.created_at}</Card.Text>
						</Card.Body>
					</Card>
				);
			})}
		</CardDeck>
	);
}

export default ArticleCards;
