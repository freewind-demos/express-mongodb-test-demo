'use strict';
import request from 'supertest';
import finish from './finish';
import {Student} from '../app/db/schema';
import db from '../app/db/db';
import app from '../app/server';
import async from 'async';

describe('students', () => {

  beforeEach((done) => {
    async.series([
      (cb) => db.connect('test', cb),
      (cb) => Student.find().remove(cb)
    ], finish(done));
  });

  afterEach((done) => {
    db.close(finish(done));
  });

  it('init', (done) => {
    async.waterfall([
      (cb) => request(app).post('/init').expect(200, cb),
      (res, cb) => Student.find(cb),
      (students, cb) => {
        expect(students.length).toEqual(23);
        cb();
      }
    ], finish(done));
  });

  it('delete user', (done) => {
    async.waterfall([
      (cb) => new Student({"name": "Lily", "gender": "女"}).save((err, data) => cb(err, data)),
      (lily, cb) => request(app).del('/students/' + lily._id).expect(204, cb),
      (res, cb) => Student.find(cb),
      (students, cb) => {
        expect(students.length).toEqual(0);
        cb();
      }
    ], finish(done));
  })
});