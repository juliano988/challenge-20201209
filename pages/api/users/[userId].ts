import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Users } from '../../../models.js'
import { User } from '../../../customTypes.js';

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .catch(error => console.log(error));

export default (req: NextApiRequest, res: NextApiResponse) => {

  const { userId } = req.query;

  mongoose.connection.on('error', err => {
    console.log(err);
  });

  switch (req.method) {

    case 'GET':
      Users.findOne({ 'login.uuid': userId }, function (err, doc: User) {
        if (err) return console.error(err);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.status(404).send('Usuário não encontrado.');
        }
      })
      break;

    case 'DELETE':
      Users.findOneAndDelete({ 'login.uuid': userId }, null, function (err, doc) {
        if (err) return console.error(err);
        if (doc) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.status(200).send('Usuário com uuid: ' + (doc as unknown as User).login.uuid + ' excluído com sucesso.');
        } else {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.status(404).send('Usuário não encontrado');
        }
      })
      break;

    case 'PUT':
      const decodedUserObj = JSON.parse(decodeURI(req.query.userObj as string));

      if (decodedUserObj.hasOwnProperty('login')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(403).send('Não é possível alterar os dados de login desta forma.');
      } else {
        Users.findOneAndUpdate({ 'login.uuid': userId }, decodedUserObj, { new: true, omitUndefined: true, lean: true }, function (err, doc) {
          if (err) return console.error(err);
          if (doc) {
            delete (doc as unknown as User).login;
            res.status(200).json(doc);
          } else {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.status(404).send('Usuário não encontrado');
          }
        })
      }
      break;

    default: break;
  }

}
