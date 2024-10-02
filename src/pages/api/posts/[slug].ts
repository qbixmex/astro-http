import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params: { slug } }) => {

  const post = await getEntry("blog", slug as any);

  if (!post) {
    return new Response(JSON.stringify({
      ok: false,
      message: `Post not found with the given slug: ${slug}`,
    }), {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      },
    });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

export const POST: APIRoute = async ({ request }) => {

  const body = await request.json();

  return new Response(JSON.stringify({
    method: "POST",
    ...body
  }), {
    status: 201,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

export const PATCH: APIRoute = async ({ request }) => {

  const body = await request.json();

  return new Response(JSON.stringify({
    method: "PATCH",
    ...body
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

export const DELETE: APIRoute = ({ params: { slug } }) => {

  return new Response(JSON.stringify({
    method: "DELETE",
    ok: true,
    message: `Post "${slug}", deleted successfully 😀👍`,
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
};
