(() => {

    'use strict';
    const mongoose = require('mongoose');

    const { Schema } = mongoose;

    const UsersSchema = new Schema({
        name            : { type: String },
        email           : { type: String },
        password        : { type: String },
        role            : { type: String, default: 'user'},
        activationToken : String,
        date            : { type: Date, default: Date.now }
    });

    const user = mongoose.model('user', UsersSchema);

    module.exports = user;
})();
