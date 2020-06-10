"use strict";

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    const user = ctx.state.user.id;
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);

      //validate picture
      if (files.userChallengePicture == null) {
        return ctx.forbidden("Please, upload a picture");
      }

      //validate challenge
      const challenge = data.challenge;
      if (challenge == null) {
        return ctx.forbidden("Challenge doesn't exist");
      }
      const foundChallenge = await strapi.services.challenge.findOne({
        id: challenge,
      });

      if (foundChallenge == null) {
        return ctx.forbidden("Challenge doesn't exist");
      }

      //check for duplicates
      const foundPicture = await strapi.services.picture.findOne({
        challenge,
        user,
      });

      if (foundPicture != null) {
        return ctx.forbidden("Pardon me? Do you want to reapeat yourself?");
      }
      
      // create a challenge
      entity = await strapi.services.picture.create(
        { ...data, user },
        { files }
      );
      return sanitizeEntity(entity, { model: strapi.models.picture });
    }
    return ctx.forbidden("expected multipart data");
  },
};
