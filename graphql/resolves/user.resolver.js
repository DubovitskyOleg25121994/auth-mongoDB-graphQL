(() => {
    'use strict';

    const user = require('../../models/user.model');

    module.exports = {
        getUser: async args => {
            try {
                const { _id } = args;
                return await user.findById(_id);
            } catch (err) {
                return err;
            }
        },

        updateUser: async args => {
            try {
                const { _id } = args.userInput;
                return await user.findOneAndUpdate({ _id }, args.userInput);
            } catch (err) {
                return err;
            }
        }
    };
})();
