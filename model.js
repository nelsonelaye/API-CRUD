let data = require("./data.json")
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
        let index= data.findIndex((d) =>d.id === id)
           data[index]= {id, ...newData}
        
        // let index = data.indexOf(studentID)

        // data.splice(index, 1, studentID)

        fs.writeFileSync("./data.json", JSON.stringify(data), (error)=> {
            if (error) {
                console.log("Could not update new student data")
            } else {
                console.log("Update successful")
            }
        })
        resolve(data[index])
    })
}


//delete data

const deleteData  = (id)=> {
    return new Promise((resolve, reject)=> {
        try {
            // let index = data.findIndex((d) => d.id === id)

            //test if function is getting the right data
            // console.log(studentID)

            // let index = data.indexOf(studentID)
            // data.splice(index, 1)

            data =data.filter((d) => d.id !== id)

            // update data file
             fs.writeFile("./data.json", JSON.stringify(data), (error) => {
                if (error) {
                    console.log("could not update file")
                }
            })

        resolve()
            
        } catch (error) {
            console.log("Could not remove data")
        }
        // let indexVal = data.findIndex((d) => d.id === id)
        
        
    })
}


module.exports = { getAll, getOne, create, update, deleteData }