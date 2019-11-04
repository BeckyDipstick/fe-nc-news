import React from 'react';
import { Dropdown } from 'react-bootstrap';

class Login extends React.Component {
	state = {
		user: ''
	};
	render() {
		const handleLogin = event => {
			const user = event.target.innerText;
			this.setState({ user });
			this.props.getUser(user);
		};
		return (
			<>
				<Dropdown>
					<Dropdown.Toggle variant="outline-success" size="sm" id="login">
						Log In
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={handleLogin}>weegembump</Dropdown.Item>
						<Dropdown.Item onClick={handleLogin}>happyamy2016</Dropdown.Item>
						<Dropdown.Item onClick={handleLogin}>jessjelly</Dropdown.Item>
						<Dropdown.Item onClick={handleLogin}>grumpy19</Dropdown.Item>
						<Dropdown.Item onClick={handleLogin}>tickle122</Dropdown.Item>
						<Dropdown.Item onClick={handleLogin}>cooljmessy</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</>
		);
	}
}

export default Login;
