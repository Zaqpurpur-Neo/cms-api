import { MongoClient } from "mongodb";

export default async function getClientPromise() {
	const url = process.env.MONGO_URL as string;
	console.log(url)
	const options = {};

	let client: MongoClient;
	let clientPromise: Promise<MongoClient>;

	client = new MongoClient(url, options);
	clientPromise = client.connect();
	return clientPromise;
}
