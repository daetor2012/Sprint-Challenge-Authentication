const authModel = require("./auth-model")
const db = require("../database/dbConfig")

test("insert", async () => {
    const res = await authModel.add({ username: "daetor2020", password: "rofl" })
    expect(res.username).toBe("daetor2020")
})

test("findById", async () => {
    const res = await authModel.findById(2)
    expect(res.username).toBe("daetor2020")
})