'use strict';

const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../passports/passport-user');
const { validateBody, schemas } = require('../helpers/route-helper');
const UsersController = require('../controllers/controller-users');
 
router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signup);
 
router.route('/signin')
  .post(validateBody(schemas.authSchema),
    passport.authenticate('local', { session: false }), UsersController.signin);
 
router.route('/secret')
  .get(passport.authenticate('jwt', { session: false }), UsersController.secret);
 
module.exports = router;