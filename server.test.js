const supertest = require("supertest")
const bcrypt = require("bcryptjs")
const server = require("./api/server")
const db = require("./database/dbConfig")


test("welcome route", async () => {
    const res = await supertest(server).get("/")
    expect(res.statusCode).toBe(200)
})

test("create user", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "daetor1010", password: "password" })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.username).toBe("daetor1010")
})

test("login", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "daetor2", password: "password" })
    expect(res.type).toBe("application/json")
    expect(res.statusCode).toBe(200)
    
    
})