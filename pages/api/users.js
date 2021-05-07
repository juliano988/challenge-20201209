// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import { Users } from '../../models.js'

const db = mongoose.connection;

export default (req, res) => {

  mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .catch(error => console.log(error));

  Users.find(function (err, docs) {
    if (err) return console.error(err);
    res.status(200).json(docs)
  })

}
