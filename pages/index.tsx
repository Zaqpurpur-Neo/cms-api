export const getServerSideProps = async ({ res }: { res: any }) => {
	const data = {
		message: "Hello from JSON homepage",
	};

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	res.setHeader("Content-Type", "application/json");
	res.write(JSON.stringify(data));
	res.end();

	return { props: {} }; // never reached, but required
};

export default function Index() {
	return null;
}

