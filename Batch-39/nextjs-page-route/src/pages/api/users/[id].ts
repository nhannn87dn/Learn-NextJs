// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

//localhost:3000/api/users/:id

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    //Lấy ID từ params
    const { id } = req.query

  //Update boi  user ID
  if (req.method === 'PUT') {
    res.status(200).json({
       message: 'Update User',
       id
    })
  }
  // Xoa boi ID
  else if(req.method === 'DELETE'){
    res.status(200).json({
        message: 'Delete User',
        id
     })
  }
  
  else {
    //GET Single
    res.status(200).json({
      message: 'get One User',
      id
    })
  }
}
