(() => {
    const userModel = require('../models/user.model');

    'use strict';

    module.exports = {
        get: async (data) => {
            try {
                const { _id } = data;
                return await userModel.findById(_id);
            } catch (err) {
                return err;
            }
        },

        update: async (data) => {
            try {
                const { _id, name } = data;
                return await userModel.findOneAndUpdate({ _id }, { name });
            } catch (err) {
                return err;
            }
        }
    };
})();
