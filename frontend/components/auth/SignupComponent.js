import { useState, useEffect } from 'react';
import { signup, isAuth } from '../../actions/auth';
import Router from 'next/router';

const SignupComponent = () => {
	const [values, setValues] = useState({
		name: 'Alexey',
		email: 'makarov.lesha001@gmail.com',
		password: '111',
		error: '',
		loading: false,
		message: '',
		showForm: true,
	});

	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);

	const { name, email, password, error, loading, message, showForm } = values;

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true, error: false });
		const user = { name, email, password };
		signup(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				setValues({
					...values,
					name: '',
					email: '',
					password: '',
					error: '',
					loading: false,
					message: data.message,
					showForm: false,
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
						onChange={handleChange('name')}
						value={name}
						type="text"
						className="form-control"
						placeholder="Your name"
					/>
				</div>
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
					<button className="btn btn-primary">Signup</button>
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

export default SignupComponent;
