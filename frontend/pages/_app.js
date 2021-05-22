import Head from 'next/head';

function MyApp(props) {
	const { Component, pageProps } = props;

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width, viewport-fit=cover, user-scalable=no"
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
