import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Voter extends React.Component {
	state = {
		changeVote: 0
	};
	voteComment = direction => {
		const path = this.props.path;
		if (this.state.changeVote === 0) {
			return axios
				.patch(`https://rebecca-nc-news.herokuapp.com/api/${path}`, {
					inc_votes: direction
				})
				.then(() => {
					this.setState({ changeVote: direction });
				});
		}
	};
	render() {
		const votes = this.props.votes;
		const voteChange = this.state.changeVote;
		return (
			<main>
				<p>{votes + voteChange} votes</p>
				<Button
					variant="outline-success"
					size={'sm'}
					id="upvoteButton"
					disabled={voteChange === 0 ? false : true}
					onClick={() => this.voteComment(1)}
				>
					Upvote
				</Button>
				<Button
					variant="outline-danger"
					size={'sm'}
					onClick={() => this.voteComment(-1)}
					disabled={voteChange === 0 ? false : true}
				>
					Downvote
				</Button>
			</main>
		);
	}
}

export default Voter;
