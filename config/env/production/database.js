const url = require("url");

module.exports = ({ env }) => {
  const parsedUrl = url.parse(process.env.DATABASE_URL);
  const [username, password] = parsedUrl.auth.split(":");

  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host: parsedUrl.hostname,
          port: parsedUrl.port,
          database: parsedUrl.path.substring(1),
          username,
          password,
        },
        options: {
          ssl: false,
        },
      },
    },
  };
};
