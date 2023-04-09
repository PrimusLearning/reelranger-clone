import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { user } = await getServerSession(req, res, authOptions);

  if (req.method === "DELETE") {
    const { id: movieId } = req.query;

    try {
      const deleteWatchlist = await prisma.watchlist.delete({
        where: {
          userId_movieId: {
            movieId,
            userId: user.id,
          },
        },
      });

      res.status(201).json({
        message: "Watchlist item deleted",
        status: "success",
        data: deleteWatchlist,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error removing from watchlist",
        status: "error",
      });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({
      message: "Method not allowed",
    });
  }
}

