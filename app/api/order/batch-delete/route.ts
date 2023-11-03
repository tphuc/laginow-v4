import { NextRequest } from "next/server";
import { z } from "zod";
import db from '@/lib/prisma'

const deleteOrderSchema = z.object({
  orderIds: z.array(z.string()), // An array of order IDs to delete
});

export async function POST(req: NextRequest) {
  try {
    const requestBody = deleteOrderSchema.parse(req.body);
    const { orderIds } = requestBody;

    // Perform batch delete in your database
    await Promise.all(
      orderIds.map(async (orderId) => {
        return db.order.delete({
          where: {
            id: orderId,
          },
        });
      })
    );

    return new Response(null, { status: 204 }); // Return a successful "No Content" response
  } catch (error) {
    return new Response(JSON.stringify({ error: "Batch delete failed" }), {
      status: 500,
    });
  }
}