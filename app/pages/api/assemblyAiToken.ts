import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      "https://api.assemblyai.com/v2/realtime/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.ASSSEMBLYAI_API_KEY ?? "",
        },
        body: JSON.stringify({ expires_in: 3600 }),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    const {
      response: { status, data } = {
        status: 500,
        data: { error: "Unknown error." },
      },
    } = error as { response?: { status: number; data: object } };
    res.status(status).json(data);
  }
}
