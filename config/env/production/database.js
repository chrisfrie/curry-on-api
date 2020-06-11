const url = require("url");

module.exports = ({ env }) => {
  const parsedUrl = url.parse(process.env.DATABASE_URL);

  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host: parsedUrl.hostname,
          port: parsedUrl.port,
          database: parsedUrl.path,
          username: parsedUrl.username,
          password: parsedUrl.password,
        },
        options: {
          ssl: false,
        },
      },
    },
  };
};
