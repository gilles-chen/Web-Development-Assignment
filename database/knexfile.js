// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "postgres",
      user: "postgres",
      password: "admin",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
