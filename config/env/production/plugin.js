module.exports = ({ env }) => ({
  upload: {
    provider: "cloudinary",
    providerOptions: {
      'cloud_name': process.env.CLOUDINARY_CLOUD_NAME,
      'api_secret': process.env.CLOUDINARY_API_SECRET,
      'api_key': process.env.CLOUDINARY_API_KEY,
      },
    },
  },
});
