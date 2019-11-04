import React from 'react';
import { Dropdown } from 'react-bootstrap';

class Sorting extends React.Component {
	state = {
		sortColumn: '',
		order: 'desc'
	};
	handleSort = event => {
		const sortColumn = event.target.innerText;
		const order = this.state.order;
		this.setState({ sortColumn }, () => {
			this.props.fetchArticles(sortColumn, order);
		});
	};
	handleOrder = event => {
		const order = event.target.innerText;
		const sortColumn = this.state.sortColumn;
		this.setState({ order }, () => {
			this.props.fetchArticles(sortColumn, order);
		});
	};
	render() {
		return (
			<>
				<Dropdown className="dropdown">
					<Dropdown.Toggle
						variant="outline-light"
						id="dropdown-basic"
						size="sm"
					>
						Sort By
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={this.handleSort}>date</Dropdown.Item>
						<Dropdown.Item onClick={this.handleSort}>votes</Dropdown.Item>
						<Dropdown.Item onClick={this.handleSort}>
							comment_count
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Dropdown className="dropdown">
					<Dropdown.Toggle
						variant="outline-light"
						size="sm"
						id="dropdown-basic"
					>
						Sort Order
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={this.handleOrder}>asc</Dropdown.Item>
						<Dropdown.Item onClick={this.handleOrder}>desc</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</>
		);
	}
}

export default Sorting;
