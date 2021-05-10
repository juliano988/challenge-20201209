import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Users } from '../../models.js'
import { PaginationMeta, User } from '../../customTypes.js';

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .catch(error => console.log(error));

export default async (req: NextApiRequest, res: NextApiResponse) => {

  mongoose.connection.on('error', err => {
    console.log(err);
  });

  if (req.query.p) {
    const selectedPage = Number(req.query.p);
    if (selectedPage) {
      const numberOfUsers = await Users.count({}).exec();
      const numberOfPages = Math.floor(numberOfUsers / 50);
      if (selectedPage > 0 && selectedPage <= numberOfPages) {
        console.log(numberOfUsers);
        const users = await Users.find({}).skip(50 * (selectedPage - 1)).limit(50).lean().exec() as Array<User>;
        const usersWithOutLoginPassword = users.map(function (user) { delete user.login.password; return user })
        const meta: PaginationMeta = { page: selectedPage, pages: numberOfPages, pageUsers: users.length, totalUsers: numberOfUsers };
        res.status(200).json({ meta: meta, users: usersWithOutLoginPassword });
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(400).send('Página não encontrada.');
      }
    } else {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(400).send('Valor da página incorreto.');
    }
  } else {
    const users = await Users.find({}).lean().exec() as Array<User>;
    const usersWithOutLoginPassword = users.map(function (user) { delete user.login.password; return user })
    res.status(200).json(usersWithOutLoginPassword);
  }

}
