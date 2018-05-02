module.exports = {
  User: {
    async roles(user, args, { Role }) {
      return Role.find({
        _id: {
          $in: user.roles,
        },
      });
    },
  },
};
