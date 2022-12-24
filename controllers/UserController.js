const User = require('../models/UserModel')

const { validationResult } = require('express-validator');


const getAllUsers = async (req, res) => {
    const users = await User.find()
    if (!users) return res.status(204).json({ 'message': 'No body loves you' })
    res.json(users)
}


const createNewUser = async (req, res) => {

    const errorFormatter = ({ location, msg, param }) => {
        return `${location}[${param}]: ${msg}`;
    };

    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array({ onlyFirstError: true }) });
    }

    let users = await User.find()
    const newUserData = {
        ...req.body,
        id: users.length ? users.length + 1 : 1,
    }

    const newUser = new User(newUserData)
    await newUser.save()
    users = [...users, newUser]
    res.status(201).json({ message: 'Create success!' })

}

const updateUser = async (req, res ) => {

    const { name, sex, address, date, dateJoined, salary, group, hobby, description, } = await req.body

    if (name || sex || address || date || dateJoined || salary || group || hobby || description) {
        let users = await User.find()
        const userUpdate = await User.findOneAndUpdate({ _id: req.params.id }, { name, sex, address, date, dateJoined, salary, group, hobby, description })
        users = [...users, userUpdate]
        return res.json({ message: 'Update success!' })
    }
    return res.status(400).json({ errors: "Need at least 1 field to be changed..." });
}

const deleteUser = async (req, res) => {
    let users = await User.find()
    const userById = await User.findOneAndRemove({ _id: req.params.id })
    if (!userById) res.status(400).json({ "message": `User ID ${req.body.id} not found` })
    const filteredUsers = users.filter(user => user.id !== req.body.id)
    users = [...filteredUsers]
    res.json({ message: 'Delete success!' })
}

const getUser = async (req, res) => {
    const userById = await User.findOne({ _id: req.params.id }).lean()
    res.json(userById)
}

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser, getUser }