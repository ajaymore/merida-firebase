module.exports = {
  User: {
    async company(user, args, { Company }) {
      return Company.findById(user.company);
    },
  },
  Company: {
    async users(company, args, { User }) {
      console.log(args, 'called', args.forSuperAdmin);
      if (args.forSuperAdmin) {
        return User.find({
          company: company._id,
          companyAdmin: true,
        });
      }
      return User.find({
        _id: {
          $in: company.users,
        },
      });
    },
  },
};
