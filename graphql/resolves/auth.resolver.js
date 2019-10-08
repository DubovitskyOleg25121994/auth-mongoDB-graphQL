(() => {
    'use strict';

    const userModel     = require('../../models/user.model');
    const AuthService   = require('../../services/auth.service');

    module.exports = {
        auth: async (args, req) => {
            try {
                const { userId: isAuth  } = req;
                const { _id } = args;
                const user = await userModel.findById(_id);
                if(!isAuth){
                    throw new Error(
                        JSON.stringify({
                            status: 400,
                            type: 'No token provided'
                        })
                    );
                }
                return user;
            } catch (err) {
                return err;
            }
        },

        register: async args => {
            try {
                const { password, email, name } = req.userInput;
                console.log('req', req);
                const user = await userModel.get({ email });
                if (user) {
                    throw new Error(
                        JSON.stringify({
                            status: 400,
                            type: 'That user is already exists'
                        })
                    );
                }

                const hash = await AuthService.generateHash(password);
                const data = {
                    name,
                    email,
                    password: hash
                };

                const newUser = await userModel.create(data);
                const jwtCreate = await AuthService.jwtCreate(newUser, {
                    type: 'activation'
                });

                const result = await userModel.findOneAndUpdate(
                    { _id: jwtCreate.user._id },
                    { activationToken: jwtCreate.token }
                );
                return result;
            } catch (err) {
                console.log('err', err);
                return err;
            }
        },

        login: async (args, req) => {
            try {
                const { email, password } = args;
                const user = await userModel.get({ email });
                if (!user) {
                    throw new Error(
                        JSON.stringify({
                            status: 400,
                            type: 'User doesn\'t exists'
                        })
                    );
                }
                await AuthService.comparePassword(password, user);
                if (!user.activationToken) {
                    console.log(
                        'AuthService.jwtCreate(user)',
                        await AuthService.jwtCreate(user)
                    );
                    return await AuthService.jwtCreate(user);
                } else {
                    throw new Error(
                        JSON.stringify({
                            status: 403,
                            type: 'Not confirmed email'
                        })
                    );
                }
            } catch (err) {
                console.log('err', err);
                return err;
            }
        },

        activation: async args => {
            try {
                const { activationToken } = args;
                const decodedToken = await AuthService.jwtVerify(
                    activationToken
                );
                if (decodedToken.type === 'activation') {
                    const user = await userModel.get({ _id: decodedToken._id });
                    console.log('user', user);
                    if (!user) {
                        throw new Error(
                            JSON.stringify({
                                status: 400,
                                type: 'User doesn\'t exists'
                            })
                        );
                    } else if (user.activationToken === activationToken) {
                        return await userModel.findOneAndUpdate(
                            { _id: user._id },
                            { activationToken: '' }
                        );
                    } else {
                        throw new Error(
                            JSON.stringify({
                                status: 400,
                                type: 'Email is already confirmed'
                            })
                        );
                    }
                } else {
                    JSON.stringify({
                        status: 400,
                        type: 'Token type verify error!'
                    });
                }
            } catch (err) {
                return err;
            }
        }
    };
})();
