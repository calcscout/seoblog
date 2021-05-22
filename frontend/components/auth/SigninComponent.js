import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';

const SigninComponent = () => {
	const [values, setValues] = useState({
		email: 'makarov.lesha001@gmail.com',
		password: '111',
		error: '',
		loading: false,
		message: '',
		showForm: true,
	});

	const { name, email, password, error, loading, message, showForm } = values;

	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true, error: false });
		const user = { email, password };
		signin(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				//save user token to cookies
				//save user info to local storage
				//authenticate user
				authenticate(data, () => {
					Router.push('/');
				});
			}
		});

		console.table({ name, email, password, error, loading, message, showForm });
	};

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const showLoading = () =>
		loading ? <div className="alert alert-info">Loading...</div> : '';

	const showError = () =>
		error ? <div className="alert alert-danger">{error}</div> : '';

	const showMessage = () =>
		message ? <div className="alert alert-info">{message}</div> : '';

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						onChange={handleChange('email')}
						value={email}
						type="email"
						className="form-control"
						placeholder="Your email"
					/>
				</div>
				<div className="form-group">
					<input
						onChange={handleChange('password')}
						value={password}
						type="password"
						className="form-control"
						placeholder="Your password"
					/>
				</div>
				<div>
					<button className="btn btn-primary">Signin</button>
				</div>
			</form>
		);
	};

	return (
		<>
			{showError()}
			{showLoading()}
			{showMessage()}

			{showForm && signupForm()}
		</>
	);
};

export default SigninComponent;
