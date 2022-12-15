const { restart } = require('nodemon')
const Pet = require('../models/Pet')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController {
    static async create(req, res) {

        const { name, age, weight, color } = req.body

        const available = true

        if (!name) {
            res.status(422).json({ message: 'Name is required' })
        }
        if (!age) {
            res.status(422).json({ message: 'Age is required' })
        }
        if (!weight) {
            res.status(422).json({ message: 'Weight is required' })
        }
        if (!color) {
            res.status(422).json({ message: 'Color is required' })
        }

        const token = getToken(req)
        const user = getUserByToken(token)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet registred successfully',
                newPet
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}