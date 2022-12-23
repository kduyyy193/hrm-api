const express = require('express')
const router = express.Router()

const userController = require('../../controllers/UserController')

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
router.route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .put(userController.updateUser)

module.exports = router