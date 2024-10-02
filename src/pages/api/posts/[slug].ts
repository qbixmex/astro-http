import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params: { slug }, request }) => {

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

//? OPTIONAL
// export const getStaticPaths: GetStaticPaths = () => {
//   return [
//     {
//       params: {
//         slug: "first-post"
//       }
//     }
//   ];
// };
