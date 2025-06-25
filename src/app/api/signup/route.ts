import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import e from "cors";
export async function POST(request: Request) {
    await dbConnect();
    try {
       const {username,email,password}=await request.json()
       const existingUserVerifiedByUsername=await UserModel.findOne({
        username,
        isVerified: true
       })
       if(existingUserVerifiedByUsername){
        return Response.json({
            success: false,
            message: "Username already exists. Please choose a different username.",
        }, { status: 400 
        })
       }
       const existingUserByEmail=await UserModel.findOne({
        email
       })
       const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
       if(existingUserByEmail){
        if(existingUserByEmail.isVerified) {
            return Response.json({
                success: false,
                message: "User already exists. Please choose a different email.",
            }, { status: 400 });
        }else {
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUserByEmail.password = hashedPassword;
            existingUserByEmail.verifycode = verifyCode;
            existingUserByEmail.verifycodeExpiry = new Date(Date.now() + 3600000); 
            await existingUserByEmail.save();
        }
       }
       else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours()+1)
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            isVerified: false,
            verifycodeExpiry: expiryDate,
            verifycode: verifyCode,
            isAcceptingMessages: true,
            messages: []
        });
        await newUser.save();
    }
    const emailResponse = await sendVerificationEmail(email, username, verifyCode);
    if(!emailResponse.success) {
        return Response.json({
            success: false,
            message: emailResponse.message,
        }, { status: 500 });
    }

        return Response.json({
            success: true,
            message: "Signup successful. Please check your email for verification.",
        }, { status: 201 } );
    } catch (error) {
        console.error("Error during signup:", error);
        return Response.json({
            success: false,
            message: "An error occurred during signup. Please try again later.",
        }, { status: 500 });
    }
}