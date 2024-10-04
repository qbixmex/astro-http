import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  getPostLikes: defineAction({
    accept: "json",
    input: z.string(),
    handler: async (postId) => {
      const response = {
        ok: true,
        postId,
        message: "Post likes retrieved successfully",
      };

      console.log({ server: true, ...response });

      return response;
    },
  })
}