import User from "../Models/user_schemas.js";

  const signup= async (req, res) =>{
      const {name, email, password} = req.body;

    try{
        const FindUser = await User.findOne({email});
        if(FindUser){
            return res.status(400).json({ message: "User already exists" });
        }
        else{
            const newUser =  new User({name, email,  password});
            await newUser.save();
            return res.status(201).json({ message: "User created successfully" });
        }
    }
    catch(err){
        res.status(500).json({ message: "Server error", error: err.message });

    }
};
export default signup



