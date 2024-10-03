import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clients = await db.select().from(Clients).limit(10);

  return new Response(JSON.stringify({
    ok: true,
    message: "Clients fetched successfully 👍🚀🐱🌮",
    clients,
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

export const POST: APIRoute = async ({ params, request }) => {

  try {
    const {id, ...body } = await request.json();

    if (id) {
      throw new Error("Client id must not be provided");
    }

    if (!body) {
      throw new Error("Client body must be provided");
    }

    const { lastInsertRowid: clientId } = await db.insert(Clients).values(body);

    return new Response(JSON.stringify({
      ok: true,
      message: "Client created successfully 👍🚀🐱🌮",
      client: {
        id: +clientId!.toString(),
        ...body
      }
    }), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({
        ok: false,
        message: `${error.message}`,
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        },
      });
    }

    console.log(error);

    return new Response(JSON.stringify({
      ok: false,
      message: "Unknown error, check logs",
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      },
    });
  }

};
