exports.seed = async function(knex) {
	await knex("users").truncate()
	await knex("users").insert([
		{ username: "daetor2012", password: "password" },
		{ username: "daetor2015", password: "password" }
	])
}
