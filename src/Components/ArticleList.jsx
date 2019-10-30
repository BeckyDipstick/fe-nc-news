import React from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { Link } from '@reach/router';
import axios from 'axios';

class ArticleList extends React.Component {
	state = {
		isLoading: true,
		articles: []
	};
	componentDidMount() {
		return axios
			.get('https://rebecca-nc-news.herokuapp.com/api/articles', {
				params: {
					topic: this.props.topic_slug
				}
			})
			.then(({ data }) => {
				this.setState({ articles: data.articles, isLoading: false });
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
				<Dropdown>
					<Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
						Sort By
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item>Date Asc</Dropdown.Item>
						<Dropdown.Item>Date Desc</Dropdown.Item>
						<Dropdown.Item>Comment Count Asc</Dropdown.Item>
						<Dropdown.Item>Comment Count Desc</Dropdown.Item>
						<Dropdown.Item>Votes Asc</Dropdown.Item>
						<Dropdown.Item>Votes Desc</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Card style={{ width: '20rem' }}>
					{articles.map(article => {
						return (
							<Card.Body key={article.article_id} className={'article-cards'}>
								<Card.Title>{article.title}</Card.Title>
								<Card.Subtitle>By {article.author}</Card.Subtitle>
								<Card.Text>Article from {article.topic}</Card.Text>
								<Card.Text>This article has {article.votes} votes</Card.Text>
								<Link to={`/articles/${article.article_id}`}>
									<Button variant="primary" size={'sm'}>
										See Full Article
									</Button>
								</Link>
								<Link to={`/articles/${article.article_id}/comments`}>
									<Button variant="primary" size={'sm'}>
										See Comments For Article
									</Button>
									<Link
										to={`/articles/${article.article_id}/comments/post_comment`}
									>
										<Button variant="outline-primary" size={'sm'}>
											Post Comment
										</Button>
									</Link>
								</Link>
								<Button variant="outline-info" size={'sm'}>
									Upvote
								</Button>
								<Button variant="outline-info" size={'sm'}>
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

export default ArticleList;
