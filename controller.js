const allModel = require("./model")

//read all data and pass to user
const readAll = async (req, res) => {
    try {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify( await allModel.getAll()))
    } catch (error) {
        console.log(error)
    }
}

//reada one file based on id

const readOne = async (req, res, id) => {
    try {
        const studentID = await allModel.getOne(id)
        if(studentID) {
            res.writeHead(200, {"content-type": "application/json"})
            res.end(JSON.stringify(studentID))
        } else {
            res.writeHead(404, {"content-type": "application/json"})
            res.end(JSON.stringify({"Ths page says": `student with id: ${id} does not exist`}))
        }
    } catch (error) {
        console.log(error.message)
    }
}


//dynamically create new data
const createNewStudent = async (req, res) => {
    try {
        let body = ""
        req.on("data", (chunk) => {
            body += chunk.toString()
        })

        req.on('end', async ()=> {
            const {studentName, course, duration} = JSON.parse(body)
            const student = {
                studentName,
                course, 
                duration
            }

            res.writeHead(201, {"content-type": "application/json"})
            res.end(JSON.stringify( await allModel.create(student)))

        })
    } catch (error) {
        console.log(error)
    }
}

//update student data
const updateStudentData = async (req, res , id) => {
    try {
        const ID = await allModel.getOne(id)
        if (ID) {
             //collect new changes
        let body = ""
        
        req.on("data", (chunk)=> {
            body += chunk.toString()
        })

        req.on("end", async ()=> {
            const {studentName, course, duration} = JSON.parse(body)
            const studentUpdate = {
                studentName, 
                course, 
                duration
            }

            res.writeHead(200, {"content-type": "application/json"})
            res.end(JSON.stringify( await allModel.update(id, studentUpdate)))
        })
        
        } else {
            res.writeHead(200, {"content-type": "application/json"})
            res.end(JSON.stringify({"message": `Student with id ${id} not found`}))
    }}catch (error) {
        console.log("error.message")
    }     
}

//delete student data

const deleteStudentData = async (req, res , id) => {
    try {
        const studentID = await allModel.getOne(id)
        if (studentID) {
            res.writeHead(200, {"content-type": "application/json"})
            res.end(JSON.stringify(await allModel.deleteData(id)))
        } else {
            res.writeHead(404, {"content-type": "application/json"})
            res.end(JSON.stringify({"message": "Student cannot be deleted. It does not exist"}))
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    readAll,
    readOne,
    createNewStudent, 
    updateStudentData,
    deleteStudentData
}