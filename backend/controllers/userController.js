import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

//@desc fetch all auth users
//@route POST api/users/login
//access Public
const getAuthUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password) )) {
        res.json({
            _id: user.id,
            name: user.name,
            email:user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            token:null
        })
    } else {
        res.status(401)
        throw new Error("Invalid  email or password");
    }
});

export {getAuthUsers}
