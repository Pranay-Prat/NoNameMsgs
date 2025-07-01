import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
    await dbConnect();
    try {
       const {username,email,password}=await request.json()
       const existingUserByUsername=await UserModel.findOne({
        username,
       })
       if(existingUserByUsername){
        return Response.json({
            success: false,
            message: "Username already exists. Please choose a different username.",
        }, { status: 400 
        })
       }
       const existingUserByEmail=await UserModel.findOne({
        email
       })
       if(existingUserByEmail){
            return Response.json({
                success: false,
                message: "User already exists. Please choose a different email.",
            }, { status: 400 });

       }
        if (!username || !email || !password) {
            return Response.json({
                success: false,
                message: "All fields are required.",
            }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            isAcceptingMessages: true,
            messages: []
        });
        await newUser.save();
        return Response.json({
            success: true,
            message: "Signup successful. "
        }, { status: 201 } );
    } catch (error) {
        console.error("Error during signup:", error);
        return Response.json({
            success: false,
            message: "An error occurred during signup. Please try again later.",
        }, { status: 500 });
    }
}