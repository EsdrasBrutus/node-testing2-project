const db = require("../data/dbConfig.js")
const request = require("supertest")
const server = require("./server.js")

const student_1 = {name:"John Smith", grade: 11}
const student_2 = {name:"Jane Doe", grade: 9}

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=>{
    await db("students").truncate()
})

afterAll(async ()=>{
    await db.destroy()
})

describe("endpoints", ()=>{
    describe("[GET] /students", ()=>{
        it("responds with a 200 ok",async ()=>{
            const res = await request(server).get("/students")
            expect(res.status).toBe(200)
        })
        it("returns the right format", async ()=>{
            await db("students").insert(student_1)
            await db("students").insert(student_2)
            const res = await request(server).get("/students")
            expect(res.body[0]).toMatchObject({id:1,...student_1})
            expect(res.body[1]).toMatchObject({id:2,...student_2})
        })
    })
    describe("[POST] /students", ()=>{
        it("responds with newly created student", async ()=>{
            let res
            res = await request(server).post("/students").send(student_1)
            expect(res.body).toMatchObject({id:1, ...student_1})
        })
        it("responds with 201 ok", async ()=>{
            const res = await request(server).post("/students").send(student_2)
            expect(res.status).toBe(201)
        })
    })
    describe("[DELETE] /students/:id", ()=>{
        it("responds with 200", async ()=>{
            await db("students").insert(student_2)
            const res = await request(server).delete("/students/1")
            expect(res.status).toBe(200)
        })
        it("returns the right num of students", async ()=>{
            let res
            await db("students").insert(student_1)
            await db("students").insert(student_2)
            res = await request(server).get("/students")
            expect(res.body).toHaveLength(2)

            res = await request(server).delete("/students/1")
            expect(res.body).toHaveLength(1)
        })
    })
})