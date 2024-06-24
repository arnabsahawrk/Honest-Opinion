import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const users = await UserModel.aggregate([
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: null, messages: { $push: "$messages" } } },
    ]);

    // data is 0
    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          messages: [],
        }),
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: users[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error is getting all messages", error);

    return Response.json(
      {
        success: false,
        messages: "Error is getting all messages",
      },
      { status: 500 }
    );
  }
}
