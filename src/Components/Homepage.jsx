import React from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import { Dropdown, Jumbotron } from 'react-bootstrap';
import SingleArticle from './SingleArticle';

class Homepage extends React.Component {
	state = {
		topics: [],
		isLoading: true,
		user: ''
	};
	componentDidMount() {
		return axios
			.get('https://rebecca-nc-news.herokuapp.com/api/topics')
			.then(({ data }) => {
				this.setState({ topics: data.topics, isLoading: false });
			});
	}
	handleLogin = event => {
		const user = event.target.innerText;
		this.setState({ user });
		this.props.getUser(user);
	};
	render() {
		const article_id = Math.floor(Math.random() * 33 + 1);
		const topics = this.state.topics;
		if (this.state.isLoading) return <p>Loading....</p>;
		return (
			<Jumbotron id="featured-article">
				<main>
					<Dropdown id="dropdown">
						<Dropdown.Toggle
							variant="outline-dark"
							id="dropdown-basic"
							size="sm"
							className="login"
						>
							Log In
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={this.handleLogin}>
								weegembump
							</Dropdown.Item>
							<Dropdown.Item onClick={this.handleLogin}>
								happyamy2016
							</Dropdown.Item>
							<Dropdown.Item onClick={this.handleLogin}>
								jessjelly
							</Dropdown.Item>
							<Dropdown.Item onClick={this.handleLogin}>grumpy19</Dropdown.Item>
							<Dropdown.Item onClick={this.handleLogin}>
								tickle122
							</Dropdown.Item>
							<Dropdown.Item onClick={this.handleLogin}>
								cooljmessy
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<h1>I'm a homepage! Woo-hoo!</h1>
					<nav>
						{topics.map(topic => {
							return (
								<Link
									to={`/topics/${topic.slug}/articles`}
									key={topic.slug}
									user={this.state.user}
								>
									{topic.slug} articles
								</Link>
							);
						})}
						<Link to="/articles" user={this.state.user}>
							All articles
						</Link>
					</nav>
					<h2 className="feature">Featured Article</h2>
					<SingleArticle article_id={article_id} />
				</main>
			</Jumbotron>
		);
	}
}

export default Homepage;
