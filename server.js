const http = require("http")
const {readAll, readOne, createNewStudent, updateStudentData,  deleteStudentData } = require("./controller")

const port = 2000

const server = http.createServer((req, res) => {
    if (req.url === "/student" && req.method === "GET") {
        res.writeHead(200, {"content-type": "application/json"})
        readAll(req, res)

    } else if (req.url.match(/\/student\/[(0-9)]/) && req.method === "GET"){
        const id = req.url.split("/")[2]
        res.writeHead(201, {"content-type": "application/json"})
        readOne(req, res, id)

    }else if (req.url === "/student/create" && req.method === "POST"){
        res.writeHead(201, {"content-type": "application/json"})
        createNewStudent(req, res)

    }else if (req.url.match(/\/student\/update\/[(0-9)]/) && req.method === "PUT"){
        const id = req.url.split("/")[3]
        res.writeHead(200, {"content-type": "application/json"})
        updateStudentData(req, res, id)

    }else if (req.url.match(/\/student\/delete\/[(0-9)]/) && req.method === "DELETE"){
        const id = req.url.split("/")[3]
        res.writeHead(200, {"content-type": "application/json"})
        deleteStudentData(req, res, id)
    }else {
        
    }
}).listen(port, () => {
    console.log("port ", port)
})