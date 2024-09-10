import { NextApiRequest, NextApiResponse } from "next";

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ id: 12 })
}

export default function Page(params: any) {
  const { params: ss } = params;

  return (
    <div className="w-full justify-center">
      <div className="bg-green-50 w-1/2">
        <form>
          <div className="p-2">
            <input className="p-2 w-full" type="text" name="name" />
          </div>
        </form>
      </div>
    </div>
  )
}
