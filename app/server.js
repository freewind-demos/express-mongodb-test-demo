'use strict';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import studentsData from './students.json';
import db from './db/db';
import {Student} from './db/schema';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use(express.static('./public'));

app.post('/init', function (req, res, next) {
  Student.find().remove(function (err) {
    if (err) return next(err);

    Student.create(studentsData, (err, all) => {
      if (err) return next(err);
      res.json(all);
    });
  });
});

app.get('/students', function (req, res, next) {
  Student.find().lean().exec((err, data) => {
    if (err) return next(err);
    res.json(data);
  })
});

app.delete('/students/:id', function (req, res, next) {
  const id = req.params.id;
  Student.find({_id: id}).remove((err, data)=> {
    if (err) return next(err);
    if (data) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});

if (require.main === module) {
  app.listen(3000, function () {
    db.connect((err) => {
      if (err) return console.error('db connection failed');
      console.log('Listening on 3000');
    });
  });
}

export default app;