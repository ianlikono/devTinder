import formatErrors from '../formatErrors';

export default {
  Mutation: {
    addTeamMember: async (parent, { email, teamId }, { models, user }) => {
      try {
        const memberPromise = models.Member.findOne(
          { where: { teamId, userId: user.id } },
          { raw: true },
        );
        const userToAddPromise = models.User.findOne({ where: { email } }, { raw: true });
        const [member, userToAdd] = await Promise.all([memberPromise, userToAddPromise]);
        if (!member.admin) {
          return {
            ok: false,
            errors: [{ path: 'email', message: 'Something Went Wrong Please Try Again' }],
          };
        }
        if (!userToAdd) {
          return {
            ok: false,
            errors: [{ path: 'email', message: 'Something Went Wrong Please Try Again' }],
          };
        }
        await models.Member.create({ userId: userToAdd.id, teamId });
        return {
          ok: true,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    createTeam: async (parent, args, { models }) => {
      try {
        await models.Team.create({ ...args });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
