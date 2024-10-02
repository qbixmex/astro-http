import type { APIRoute } from "astro";
import type { Person } from "@interfaces/person";

const person: Person = {
  name: "Michael Jackson",
  age: 50,
  country: "USA",
  city: "Gary",
  state: "Indiana",
  nationality: "American",
  isActive: false
};

export const GET: APIRoute = ({ params, request }) => {
  return new Response(JSON.stringify(person), {
    status: 201,
    headers: {
      "Content-Type": "application/json"
    },
  });
};
