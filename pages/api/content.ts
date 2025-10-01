import getClientPromise from "@/lib/mongodb";
import withCors from "@/lib/withCors";
import { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	if(req.method === "OPTIONS") {
		return res.status(200).end()
	}

	if(req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
	if(req.headers.authorization !== `Bearer ${process.env.ADMIN_KEY}`) {
		return res.status(401).json({ error: "Unauthorized" })
	}

	try {
		const client = await getClientPromise();
		const db = client.db("cms");

		const { slug } = req.query;

		if (slug) {
			const post = await db.collection("posts").findOne({ slug: String(slug) });

			if (!post) return res.status(404).json({ error: "Post not found" });
			return res.status(200).json(post);
		} else {
			const posts = await db
				.collection("posts")
          		.find({})
          		.project({ contents: 0 })          		
				.toArray();
        	return res.status(200).json(posts);
      	}
	} catch(err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
}

export default withCors(handler)
