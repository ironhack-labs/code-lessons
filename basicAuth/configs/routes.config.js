const express = require('express')
const router = express.Router()
const sessionMiddleware = require('../middlewares/session.middleware')
const usersController = require('../controllers/users.controllers')
const { Router } = require('express')


router.get('/',usersController.index)
router.get('/signup', usersController.signup)
router.get('/login', usersController.login)
router.get('/main', sessionMiddleware.isAuthenticated, usersController.main)
router.get('/private', sessionMiddleware.isAuthenticated, usersController.private)
router.get('/logout',usersController.logout)


router.post('/signup', usersController.doSignup)
router.post('/login', usersController.doLogin)




module.exports = router
