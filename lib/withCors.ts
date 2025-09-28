import { NextApiRequest, NextApiResponse } from "next";

export default function withCors(handler: (req: NextApiRequest, res: NextApiResponse<any>) => any) {
	return async (req: NextApiRequest, res: NextApiResponse<any>) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	 	if (req.method === "OPTIONS") {
			return res.status(200).end();
		}

    	return handler(req, res);
	}
}
