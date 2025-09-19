import getClientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if(req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
	if(req.headers.authorization !== `Bearer ${process.env.ADMIN_KEY}`) {
		return res.status(401).json({ error: "Unauthorized" })
	}

	try {
		const client = await getClientPromise();
		const db = client.db("cms");

		const { slug, title, author, contents } = req.body;
		const now = new Date();
		await db.collection("post").updateOne(
			{ slug },
			{
				$set: { title, slug, author, contents, updatedAt: now },
				$setOnInsert: { createdAt: now }
			},
			{ upsert: true }
		);

		res.status(200).json({ success: true });
	} catch(err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
}
