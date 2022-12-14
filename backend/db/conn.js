const mongoose = require('mongoose')

mongoose.set("strictQuery", true);
async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/getyourpet')
    console.log('Mongoose is connected')
}

main().catch((err) => console.log(err))

module.exports = mongoose