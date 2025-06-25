import { NextAuthOptions } from "next-auth";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials:{
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                   const user = await UserModel.findOne({
                        $or:[
                            {
                                email: credentials.identifier
                            },{
                                username: credentials.identifier
                            }
                        ]
                    })
                    if(!user) {
                        throw new Error("No user found with the given credentials");
                    }
                    if(!user.isVerified) {
                        throw new Error("User is not verified. Please verify your account.");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if(!isPasswordCorrect) {
                        throw new Error("Incorrect password");
                    }
                } catch (error: any) {
                    console.error("Error connecting to the database:", error);
                    throw new Error(error);
                    
                }
            }
        })
    ],
    pages:{
        signIn: "/signin"
    },
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    
}