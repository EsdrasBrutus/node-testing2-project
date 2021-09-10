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
            await db("students").insert(frodo)
            await db("students").insert(sam)
            const res = await request(server).get("/students")
            expect(res.body[0]).toMatchObject({id:1,...frodo})
            expect(res.body[1]).toMatchObject({id:2,...sam})
        })
    })
})