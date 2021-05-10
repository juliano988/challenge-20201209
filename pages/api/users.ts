import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Users } from '../../models.js'

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .catch(error => console.log(error));

export default async (req: NextApiRequest, res: NextApiResponse) => {

  mongoose.connection.on('error', err => {
    console.log(err);
  });

  await Users.find(function (err, docs) {
    if (err) return console.error(err);
    res.status(200).json(docs)
  })

}
