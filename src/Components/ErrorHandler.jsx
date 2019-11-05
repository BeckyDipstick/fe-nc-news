import React from 'react';
import { Link } from '@reach/router';
import NotFound from './NotFound';

function ErrorHandler(props) {
	const errMsg = props.errMsg;
	const errStatus = props.errStatus;
	if (errStatus === 404)
		return (
			<div className="errors">
				<ul>
					<li>
						<Link to="/">Back to Safety!</Link>
					</li>
				</ul>
				<h1>Oopsy Daisy you can haz a {errStatus}</h1>
				<h2>{errMsg}</h2>
				<img src="https://httpstatusdogs.com/img/404.jpg" alt="404 dog"></img>
			</div>
		);
	if (errStatus === 400)
		return (
			<div className="errors">
				<ul>
					<li>
						<Link to="/">Back to Safety!</Link>
					</li>
				</ul>
				<h1>Oopsy Daisy you can haz a {errStatus}</h1>
				<h2>{errMsg}</h2>
				<img src="https://httpstatusdogs.com/img/400.jpg" alt="400 dog"></img>
			</div>
		);
	if (errStatus === 422)
		return (
			<div className="errors">
				<ul>
					<li>
						<Link to="/">Back to Safety!</Link>
					</li>
				</ul>
				<h1>Oopsy Daisy you can haz a {errStatus}</h1>
				<h2>{errMsg}, Invalid Username! Please login to continue</h2>
				<img
					src="https://www.tynker.com/projects/screenshot/5abba72e949b56cd5b8b458b/derp-face.png"
					alt="oopsy"
					id="oopsy"
				></img>
			</div>
		);
	if (errStatus === 500) return <NotFound />;
	if (errStatus === 418)
		return (
			<div className="errors">
				<ul>
					<li>
						<Link to="/">Back to Safety!</Link>
					</li>
				</ul>
				<h1>Oopsy Daisy you can haz a {errStatus}</h1>
				<h2>{errMsg}, Invalid Username! Please login to continue</h2>
				<img src="https://httpstatusdogs.com/img/418.jpg" alt="418-dog"></img>
			</div>
		);
}

export default ErrorHandler;
