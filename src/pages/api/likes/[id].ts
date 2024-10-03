import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

  const postId = params.id ?? "";

  const post = await db
    .select()
    .from(Posts)
    .where(eq(Posts.id, postId))
    .get();

  if (!post) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Post not found",
        post: {
          id: postId,
          title: "",
          likes: 0,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      post,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
