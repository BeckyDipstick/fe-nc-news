import React from 'react';
import { Card, Button, Dropdown, CardDeck } from 'react-bootstrap';
import { Link } from '@reach/router';
import axios from 'axios';
import Voter from './Voter';

class ArticleList extends React.Component {
	state = {
		isLoading: true,
		articles: [],
		user: this.props.user
	};
	componentDidMount() {
		return axios
			.get('https://rebecca-nc-news.herokuapp.com/api/articles', {
				params: {
					topic: this.props.topic_slug
				}
			})
			.then(({ data }) => {
				this.setState({
					articles: data.articles,
					isLoading: false
				});
			});
	}
	render() {
		if (this.state.isLoading) return <p>Loading....</p>;
		const articles = this.state.articles;
		return (
			<main>
				<h1>наздраве!</h1>
				<nav>
					<Link to="/">Home</Link>
				</nav>
				<Dropdown className="dropdown">
					<Dropdown.Toggle variant="outline-dark" id="dropdown-basic" size="sm">
						Sort By
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item>Date</Dropdown.Item>
						<Dropdown.Item>Votes</Dropdown.Item>
						<Dropdown.Item>Comment Count</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Dropdown className="dropdown">
					<Dropdown.Toggle variant="outline-dark" size="sm" id="dropdown-basic">
						Sort Order
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item>Asc</Dropdown.Item>
						<Dropdown.Item>Desc</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<CardDeck style={{ display: 'flex', flexDirection: 'row' }}>
					<Card style={{ flex: 1 }}>
						{articles.map(article => {
							return (
								<Card.Body key={article.article_id} className={'article-cards'}>
									<Card.Title>{article.title}</Card.Title>
									<Card.Subtitle>By {article.author}</Card.Subtitle>
									<Card.Text>Article from {article.topic}</Card.Text>

									<Link
										to={`/articles/${article.article_id}`}
										user={this.state.user}
									>
										<Button variant="primary" size={'sm'}>
											See Full Article
										</Button>
									</Link>
									<Link
										to={`/articles/${article.article_id}/comments`}
										user={this.state.user}
									>
										<Button variant="primary" size={'sm'}>
											See Comments For Article
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
									<Voter
										id={article.article_id}
										votes={article.votes}
										path={`articles/${article.article_id}`}
									/>
								</Card.Body>
							);
						})}
					</Card>
				</CardDeck>
			</main>
		);
	}
}

export default ArticleList;
