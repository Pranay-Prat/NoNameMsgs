import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
export async function POST(request: Request) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user as User;
        if(!session || !session.user) {
            return Response.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }
        const userId = user?._id
        const {acceptMessages} = await request.json();
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessages: acceptMessages  },
            { new: true }
        );
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 401 });
        }
        return Response.json({
            success: true,
            message: "User message preference updated successfully",
            updatedUser
        }, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/accept-messages:", error);
        return Response.json({
            success: false,
            error: "Error while accepting messages."
        }, { status: 500 });
        
    }
}
export async function GET() {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user as User;
        if(!session || !session.user) {
            return Response.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }
        const userId = user?._id
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 401 });
        }
        return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessages
        }, { status: 200 });
    } catch (error) {
        console.error("Error in GET /api/accept-messages:", error);
        return Response.json({
            success: false,
            error: "Error while fetching user message preference."
        }, { status: 500
        })
    }

}
