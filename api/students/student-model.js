const db = require('../../data/dbConfig.js')

const get = () => {
    return db('students')
}

const getById = (id) =>{
    return db('students')
    .where({ id })
    .first();
}

const insert = async (student) =>{
    const [id] = await db("students").insert(student)
    return db("students").where({id}).first()
}

const remove = (id) => {
    return db('students')
        .where('id', id)
        .del();
}

module.exports = {
    get,
    getById,
    insert,
    remove
}