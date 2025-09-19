export const getServerSideProps = async ({ res }: { res: any }) => {
	const data = {
		message: "Hello from JSON homepage",
	};

	res.setHeader("Content-Type", "application/json");
	res.write(JSON.stringify(data));
	res.end();

	return { props: {} }; // never reached, but required
};

export default function Index() {
	return null;
}

