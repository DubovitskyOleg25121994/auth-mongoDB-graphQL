(() => {

    'use strict';
    const mongoose = require('mongoose');

    const { Schema } = mongoose;

    const UsersSchema = new Schema({
        name            : { type: String, required: true },
        email           : { type: String, required: true },
        password        : { type: String, required: true },
        role            : { type: String, default: 'user'},
        activationToken : String,
        date            : { type: Date, default: Date.now }
    });

    const user = mongoose.model('user', UsersSchema);

    module.exports = user;
})();
