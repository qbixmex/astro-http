import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const clientId = params.clientId ?? '';

  try {
    const client = await db.select().from(Clients)
      .where(eq(Clients.id, +clientId))
      .get();

    if (!client) {
      throw new Error(`Client with id: "${clientId}", not found`);
    }

    return new Response(JSON.stringify({
      ok: true,
      message: `Client with id: "${clientId}", fetched successfully`,
      client,
    }), {
      status: 200,
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

export const PATCH: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? '';
  const { ...body } = await request.json();

  try {
    const results = await db.update(Clients)
      .set(body)
      .where(eq(Clients.id, +clientId));

    if (results.rowsAffected === 0) {
      throw new Error(`Client with id: "${clientId}", not found`);
    }

    const client = await db.select().from(Clients)
      .where(eq(Clients.id, +clientId))
      .get();

    return new Response(JSON.stringify({
      ok: true,
      message: `Client with id: "${clientId}", updated successfully 👍🚀🌮`,
      client,
    }), {
      status: 200,
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

export const DELETE: APIRoute = async ({ params }) => {
  const clientId = params.clientId ?? '';

  try {
    const client = await db.select().from(Clients)
      .where(eq(Clients.id, +clientId))
      .get();

    if (!client) {
      throw new Error(`Client with id: "${clientId}", not found`);
    }

    await db.delete(Clients).where(eq(Clients.id, +clientId));

    return new Response(JSON.stringify({
      ok: true,
      message: `Client with id: "${clientId}", deleted successfully 👍🚀🌮`,
      deleteClient: client,
    }), {
      status: 200,
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
