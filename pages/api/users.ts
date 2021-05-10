import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Users } from '../../models.js'
import { User } from '../../customTypes.js';

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .catch(error => console.log(error));

export default async (req: NextApiRequest, res: NextApiResponse) => {

  mongoose.connection.on('error', err => {
    console.log(err);
  });

  const users = await Users.find({}).lean().exec() as Array<User>;
  const usersWithOutLoginPassword = users.map(function (user) { delete user.login.password; return user })
  res.status(200).json(usersWithOutLoginPassword);

}
