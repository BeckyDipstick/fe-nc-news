import React from 'react';
import { Button } from 'react-bootstrap';
import * as api from '../api';

class Voter extends React.Component {
	state = {
		changeVote: 0
	};
	updateVote = direction => {
		const path = this.props.path;
		api.patchVote(direction, path).then(() => {
			this.setState(currentState => {
				return { changeVote: currentState.changeVote + direction };
			});
		});
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
					className="vote-button"
					disabled={voteChange <= 0 ? false : true}
					onClick={() => this.updateVote(1)}
				>
					Upvote
				</Button>
				<Button
					variant="outline-danger"
					size={'sm'}
					onClick={() => this.updateVote(-1)}
					disabled={voteChange >= 0 ? false : true}
					className="vote-button"
				>
					Downvote
				</Button>
			</main>
		);
	}
}

export default Voter;
