import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId;

  return new Response(JSON.stringify({
    method: "GET",
    client: {
      id: clientId,
      name: "Michael Jackson",
      age: 50,
      country: "USA",
      city: "Gary",
      state: "Indiana",
      nationality: "American",
      isActive: false
    },
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });

  //! ERROR CASE
  // return new Response(JSON.stringify({
  //   message: "Client id not provided",
  // }), {
  //   status: 404,
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  // });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId;

  const body = await request.json();

  return new Response(JSON.stringify({
    method: "PATCH",
    client: {
      id: clientId,
      name: "Michael Jackson",
      age: 50,
      country: "USA",
      city: "Gary",
      state: "Indiana",
      nationality: "American",
      isActive: false
    },
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });

  //! ERROR CASE
  // return new Response(JSON.stringify({
  //   message: "Client id not provided",
  // }), {
  //   status: 404,
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  // });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId;
  const body = await request.json();

  return new Response(JSON.stringify({
    method: "DELETE",
    client: {
      id: clientId,
      name: "Michael Jackson",
      age: 50,
      country: "USA",
      city: "Gary",
      state: "Indiana",
      nationality: "American",
      isActive: false
    },
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });

  //! ERROR CASE
  // return new Response(JSON.stringify({
  //   message: "Client id not provided",
  // }), {
  //   status: 404,
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  // });
};
