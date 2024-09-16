// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

//localhost:3000/api/users
//GET ALL
//POST new record

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //Thêm mới
  if (req.method === 'POST') {

    const bodyData = req.body

    // Process a POST request
    res.status(201).json({
       message: 'Create new User',
       body: bodyData
    })
  } else {
    //GET ALL
    const {page} = req.query

    res.status(201).json({
      message: 'getALL Users',
      page
    })
  }
}
