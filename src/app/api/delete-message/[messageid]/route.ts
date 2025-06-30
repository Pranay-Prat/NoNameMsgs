import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const messageId = url.pathname.split("/").pop(); // Get [messageid] from URL

  if (!messageId) {
    return Response.json(
      {
        success: false,
        message: "Message ID not provided",
      },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const updateResult = await UserModel.updateOne(
      { _id: new mongoose.Types.ObjectId(user._id) },
      { $pull: { messages: { _id: new mongoose.Types.ObjectId(messageId) } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to delete message",
      },
      { status: 500 }
    );
  }
}
