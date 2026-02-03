const User = require("../models/User");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config();

const register=async(req,res)=>{
  try {
    const {name,age,email,role,password}=req.body;
    if(!name || !age || !email ||!password){
      return res.status(400).json({success:false,message:"Please enter all details"})
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(409).json({success:false,message:"User already exists"})
    }
    const hashPassword=await bcrypt.hash(password,10);
    const user=new User({
      name,
      age,
      email,
      role,
      password:hashPassword
    })
    const token=jwt.sign({
      id:user._id,
      email,
      role
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    await user.save();
    res.status(201).json({success:true,message:"User registered successfully",token:token});
  } catch (error) {
    res.status(500).json({success:false,error:error.message})
  }
}
const login=async(req,res)=>{
  try {
    const{email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(404).json({success:false,message:"User not exists"})
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({success:false,message:"Invalid credentials"})
    }
    const token=jwt.sign({
      id:user._id,
      email:user.email,
      role:user.role

    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.status(200).json({success:true,message:"Login successful",token:token})
  } catch (error) {
    res.status(500).json({success:false,error:error.message})
  }
}
const getUsers=async(req,res)=>{
  try {
    
    const role=req.user.role;
    if(role!=="admin"){
      return res.status(403).json({success:false,message:"Access Denied:Admin only"})
    }
    const users=await User.find();
    res.status(200).json({success:true,message:"User fetched successfully",users:users})
  } catch (error) {
    res.status(500).json({success:false,error:error.message})
  }
}
const getUserById=async(req,res)=>{
  try {
     
    const id=req.params.id;
    if(req.user.role!=="admin"){
      return res.status(403).json({success:false,message:"Access Denied:Admin only"})
    }
    const user=await User.findById(id);
    if(!user){
      return res.status(404).json({success:false,message:"User not found"})
    }
    res.status(200).json({success:true,message:"User fetched successfully",user:user})
  } catch (error) {
     res.status(500).json({success:false,error:error.message})
  }
}
const getCurrentUser=async(req,res)=>{
  try{
  
  const email=req.user.email
  const user=await User.findOne({email})
    res.status(200).json({success:true,message:"User fetched successfully",user:user})
  }catch(error){
     res.status(500).json({success:false,error:error.message})
  }
}
const updateUserByEmail = async (req, res) => {
  try {
  
    const email = req.user.email;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    let token = null;

   
    if (req.body.email || req.body.role) {
      token = jwt.sign(
        {
          id: updatedUser._id,
          email: updatedUser.email,
          role: updatedUser.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
      token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateUserById=async(req,res)=>{
  try {
    
    const id=req.params.id;
    const role=req.user.role;
    if(role!=="admin"){
      return res.status(403).json({success:false,message:"Access Denied:Admin only"})
    }
    const updatedUser=await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
    if(!updatedUser){
      return  res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({success:true,message:"User updated successfully",updatedUser:updatedUser})
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
const deleteUserById = async (req, res) => {
  try {
    

    const id = req.params.id;
    const role = req.user.role;

    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Admin only"
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {

    // 🔥 Handle invalid ObjectId automatically
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserByEmail,
  updateUserById,
  deleteUserById
};
