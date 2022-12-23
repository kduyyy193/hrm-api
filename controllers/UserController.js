const User = require('../models/UserModel')

let users = []

const getAllUsers = async (req, res) => {
    users = await User.find()
    if (!users) return res.status(204).json({'message': 'No body loves you'})
    res.json(users)
}

const createNewUser = async (req, res) => {
    const newUserData = {
        ...req.body,
        id: users.length ? users[users.length - 1].id : 1,
    }

    for (const prop in newUserData) {
        if(!newUserData[prop]) {
            return res.status(400).json({'message': `${prop} required.`})
        }
    }
    const newUser = new User(newUserData)
    await newUser.save()
    users = [...users, newUser]
    res.status(201).json({message: 'Create success!'})       
}

const updateUser = async (req, res) => {
    const {name, sex, address, date, dateJoined, salary, group, hobby, description,} = req.body
    const userUpdate = await User.findOneAndUpdate({_id: req.params.id}, {name, sex, address, date, dateJoined, salary, group, hobby, description})
    users = [...users, userUpdate]
    res.json({message: 'Update success!'})
}

const deleteUser = async (req, res) => {
    // const user = users.find(user => user.id === req.body.id)
    // if (!user) res.status(400).json({ "message": `User ID ${req.body.id} not found` });
    // const filteredUsers = users.filter(user => user.id !== req.body.id)
    // users = [...filteredUsers]
    // res.json(users)

    const userById = await User.findOneAndRemove({_id: req.params.id})
    if (!userById) res.status(400).json({ "message": `User ID ${req.body.id} not found` })
    const filteredUsers = users.filter(user => user.id !== req.body.id)
    users = [...filteredUsers]
    res.json({message: 'Delete success!'})
}

const getUser = async (req, res) => {
    // const user = users.find(user => user.id === req.body.id)
    // if (!user) res.status(400).json({ "message": `User ID ${req.body.id} not found` });
    // req.json(user)

    const userById = await User.findOne({_id: req.params.id}).lean()
    res.json(userById)
}

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser, getUser}