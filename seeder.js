require("dotenv").config({ path: "./config/config.env" })

const fs = require("fs")
const mongoose = require("mongoose")
const colors = require("colors")
const Task = require("./models/Task")
const User = require("./models/User")




mongoose.connect(process.env.MONGO_URI);

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/_data/tasks.json`, 'utf-8'))

//Import Into DB
const importData = async () => {
    console.log("Importing Data ...".blue)
    try {
        await User.create(users)
        console.log("Users data have been imported".green)
        await Task.create(tasks)
        console.log("Tasks data have been imported".green)


        console.log("All Done".blue)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

//Delete  Data from DB
const deleteData = async () => {
    console.log("Destroying Data...".yellow)

    try {
        await User.deleteMany()
        console.log("Users data have been destroyed".red)
        await Task.deleteMany()
        console.log("Tasks data have been destroyed".red)

        console.log("Done".blue)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

if (process.argv[2] === "-i") {
    importData()
}

else if (process.argv[2] === "-d") {
    deleteData()
}

