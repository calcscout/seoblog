import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
	return (
		<Layout>
			<Link href="/signup">
				<a>Signup</a>
			</Link>
		</Layout>
	);
};

export default Index;
