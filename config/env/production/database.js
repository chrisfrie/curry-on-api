const url = require("url");
const [username, password] = parsedUrl.auth.split(":");

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
