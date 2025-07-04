import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET() {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        }, { status: 401 });
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
            { $sort: { "messages.createdAt": -1 } },
            {
                $group: {
                    _id: "$_id",
                    messages: { $push: "$messages" }
                }
            }
        ]);

        // If user found but no messages
        if (!user || user.length === 0) {
            return Response.json({
                success: true,
                messages: []
            }, { status: 200 });
        }

        return Response.json({
            success: true,
            messages: user[0].messages
        }, { status: 200 });

    } catch (error) {
        console.error("Error in GET /api/get-messages:", error);
        return Response.json({
            success: false,
            error: "Error while fetching messages."
        }, { status: 500 });
    }
}
