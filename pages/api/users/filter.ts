import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Users } from '../../../models.js'
import { PaginationMeta, User } from '../../../customTypes.js';

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .catch(error => console.log(error));

export default async (req: NextApiRequest, res: NextApiResponse) => {

  mongoose.connection.on('error', err => {
    console.log(err);
  });

  const decodedUserNameRegex = new RegExp(decodeURI(req.query.userName as string), 'i');
  const requestedPage = Number(req.query.p);

  if (requestedPage) {
    const foundedUsers = await Users.find({ 'name.first': decodedUserNameRegex }).skip(50 * (requestedPage - 1)).limit(50).lean().exec() as Array<User>;
    if (foundedUsers.length) {
      const numberOfAllFoundedUsers = (await Users.find({ 'name.first': decodedUserNameRegex }).lean().exec()).length;
      const numberOfPages = Math.ceil(numberOfAllFoundedUsers / 50);
      const foundedUsersWithOutLoginPassword = foundedUsers.map(function (user) { delete user.login.password; return user });
      const meta: PaginationMeta = { page: requestedPage, pages: numberOfPages, pageUsers: foundedUsers.length, totalUsers: numberOfAllFoundedUsers };
      res.status(200).json({ meta: meta, users: foundedUsersWithOutLoginPassword });
    } else {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(404).send('A busca não retornou resultados.');
    }
  } else {
    const foundedUsers = await Users.find({ 'name.first': decodedUserNameRegex }).lean().exec() as Array<User>;
    if (foundedUsers.length) {
      const foundedUsersWithOutLoginPassword = foundedUsers.map(function (user) { delete user.login.password; return user });
      res.status(200).json(foundedUsersWithOutLoginPassword);
    } else {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(404).send('A busca não retornou resultados.');
    }
  }

}