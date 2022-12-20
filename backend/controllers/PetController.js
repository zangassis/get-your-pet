const { restart } = require('nodemon')
const Pet = require('../models/Pet')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
    static async create(req, res) {

        const { name, age, weight, color } = req.body

        const images = req.files

        const available = true

        if (!name) {
            res.status(422).json({ message: 'Name is required' })
            return
        }
        if (!age) {
            res.status(422).json({ message: 'Age is required' })
            return
        }
        if (!weight) {
            res.status(422).json({ message: 'Weight is required' })
            return
        }
        if (!color) {
            res.status(422).json({ message: 'Color is required' })
            return
        }
        if (images.length === 0) {
            res.status(422).json({ message: 'Image is required' })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

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

        images.map((image) => {
            pet.images.push(image.filename)
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

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({
            pets: pets
        })
    }

    static async getAllUserPets(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)
        const pets = await Pet.find({ "user._id": user._id }).sort('-createdAt')

        res.status(200).json({ pets: pets })
    }

    static async getAllUserAdoptions(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)
        const pets = await Pet.find({ "adopter._id": user._id }).sort('-createdAt')

        res.status(200).json({ pets: pets })
    }

    static async getPetById(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id is invalid' })
            return
        }
        const pet = await Pet.findById(id)

        if (!pet) {
            res.status(404).json({ message: 'Pet not found' })
            return
        }

        res.status(200).json({ pet: pet })
    }

    static async removePetById(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'Id is invalid' })
            return
        }

        const pet = await Pet.findById(id)

        if (!pet) {
            res.status(404).json({ message: 'Pet not found' })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: 'Error. Try again' })
            return
        }

        await Pet.findByIdAndRemove(id)
        res.status(200).json({ message: 'Pet removed successfully' })
    }

    static async updatePet(req, res) {
        const id = req.params.id

        const { name, age, weight, color, available } = req.body

        const images = req.files

        const updatedData = {}

        const pet = await Pet.findById(id)

        if (!pet) {
            res.status(404).json({ message: 'Pet not found' })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: 'Error. Try again' })
            return
        }

        if (!name) {
            res.status(422).json({ message: 'Name is required' })
            return
        } else {
            updatedData.name = name
        }
        if (!age) {
            res.status(422).json({ message: 'Age is required' })
            return
        } else {
            updatedData.age = age
        }
        if (!weight) {
            res.status(422).json({ message: 'Weight is required' })
            return
        } else {
            updatedData.weight = weight
        }
        if (!color) {
            res.status(422).json({ message: 'Color is required' })
            return
        } else {
            updatedData.color = color
        }
        if (images.length === 0) {
            res.status(422).json({ message: 'Image is required' })
            return
        } else {
            updatedData.images = []
            images.map((image) => {
                updatedData.images.push(image.filename)
            })
        }
        await Pet.findByIdAndUpdate(id, updatedData)

        res.status(200).json({ message: 'Pet updating successfully' })
    }
}