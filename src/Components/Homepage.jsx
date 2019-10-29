import React from 'react';
import { Link } from '@reach/router';
import axios from 'axios';

class Homepage extends React.Component {
	state = {
		topics: [],
		isLoading: true
	};
	componentDidMount() {
		return axios
			.get('https://rebecca-nc-news.herokuapp.com/api/topics')
			.then(({ data }) => {
				this.setState({ topics: data.topics, isLoading: false });
			});
	}
	render() {
		const topics = this.state.topics;
		if (this.state.isLoading) return <p>Loading....</p>;
		return (
			<main>
				<h1>I'm a homepage! Woo-hoo!</h1>
				<nav>
					{topics.map(topic => {
						return (
							<Link to={`/topics/${topic.slug}/articles`} key={topic.slug}>
								{topic.slug} articles
							</Link>
						);
					})}
					<Link to="/articles">All articles</Link>
				</nav>
				<h2>Featured Article</h2>
			</main>
		);
	}
}

export default Homepage;
