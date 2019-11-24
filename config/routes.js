const express = require('express')
const router = express.Router()
const authenticateUser = require('../app/middlewares/authentication')

const notesController = require('../app/controllers/notesController')
const categoriesController = require('../app/controllers/categoriesController')
const usersController = require('../app/controllers/usersController')
//objects having properties as callback functions

router.get('/notes',notesController.list)
router.post('/notes',notesController.create)
router.get('/notes/:id',notesController.show)
router.put('/notes/:id',notesController.update)
router.delete('/notes/:id',notesController.destroy)

router.get('/categories',categoriesController.list)
router.post('/categories',categoriesController.create)
router.get('/categories/:id',categoriesController.show)
router.put('/categories/:id',categoriesController.update)
router.delete('/categories/:id',categoriesController.destroy)

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.account)
router.delete('/users/logout', authenticateUser, usersController.logout)

module.exports = router