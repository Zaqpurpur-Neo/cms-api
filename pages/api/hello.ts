import withCors from "@/lib/withCors";
import type { NextApiRequest, NextApiResponse } from "next";

function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  res.status(200).json({ name: "John Doe" });
}

export default withCors(handler)
