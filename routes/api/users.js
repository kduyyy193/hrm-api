const express = require('express')
const router = express.Router()

const userController = require('../../controllers/UserController')

const {validateUser} = require('../../validator/validator')

router.route('/')
    .get(userController.getAllUsers)
    .post(validateUser(),userController.createNewUser)
router.route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .put(validateUser(),userController.updateUser)

module.exports = router