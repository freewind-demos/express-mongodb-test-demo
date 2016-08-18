import request from 'supertest';
import finish from './finish';
import {Student} from '../app/db/schema';
import db from '../app/db/db';
import app from '../app/server';

describe('students', () => {
  beforeEach((done) => {
    db.connect('test', (err) => {
      if (err) return done.fail(err);
      Student.find().remove(finish(done));
    });
  });
  afterEach((done) => {
    db.close(finish(done));
  });

  it('init', (done) => {
    request(app)
      .post('/init')
      .expect(200, function (err) {
        if (err) return done.fail(err);

        Student.find(function (err, users) {
          if (err) return done.fail(err);

          expect(users.length).toEqual(23);
          done();
        });
      });
  });

  it('delete user', (done) => {
    new Student({"name": "Lily", "gender": "女"})
      .save(function (err, savedUser) {
        if (err) return done.fail(err);

        request(app)
          .delete('/students/' + savedUser._id)
          .expect(204, function (err, res) {
            if (err) return done.fail(err);

            Student.find(function (err, students) {
              if (err) return done.fail(err);

              expect(students.length).toEqual(0);
              done();
            });
          });
      })
  })

});