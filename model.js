const data = require("./data.json")
const {v4: uuidv4} = require('uuid')

const fs = require("fs")

//read all student data
const getAll = () => {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}


//get one data 
const getOne = (id) => {
    return new Promise((resolve, reject) => {
        const dataID = data.find((el) => el.id === id)
        resolve(dataID)
    })

}

//add newdstatic data

// randNumber = Math.floor(Math.random() * 20)

//add new data dynamically 
const create = (newStudent) => {
    return new Promise((resolve, reject)=> {
        const newData = {id: uuidv4(), ...newStudent}
        data.push(newData)
    
        fs.writeFileSync("./data.json", JSON.stringify(data), (error) => {
            if(error) {
                console.log("could not write file")
            } else{
                console.log("success writting to file")
            }
        })
    
        resolve(newData)
    

    })
   

} 

//update student data 
const update = (id, newData) => {
    return new Promise((resolve, reject) => {
        let studentID = data.find((d) => d.id === id)
         studentID = {...newData}

        // data.push(studentID)

        fs.writeFileSync("./data.json", JSON.stringify(data), (error)=> {
            if (error) {
                console.log("Could not update new student data")
            } else {
                console.log("Update successful")
            }
        })
        resolve(studentID)
    })
}


//delete data

const deleteData  = (id)=> {
    return new Promise((resolve, reject)=> {
        try {
            let studentID = data.filter(d => d.id === id)

            //test if function is getting the right data
            console.log(studentID)

            let index = data.indexOf(studentID)
            // if(studentID ){
            //     data.find((d) => d.id === id)
            // } else {
            //     console.log("element not found")
            // }
            // data.splice(index, 1)

            //update data
            //  fs.writeFile("./data.json", JSON.stringify(data), (error) => {
            //     if (error) {
            //         console.log("could not update file")
            //     }
            // })

        resolve(data)
            
        } catch (error) {
            console.log("Could not remove data")
        }
        // let indexVal = data.findIndex((d) => d.id === id)
        
        

       

        
    })
}


module.exports = { getAll, getOne, create, update, deleteData }