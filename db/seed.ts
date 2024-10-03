import { getCollection } from "astro:content";
import { Clients, Posts, db } from "astro:db";
import crypto from "node:crypto";

// https://astro.build/db/seed
export default async function() {
  await db.insert(Clients).values([
		{
			id: 1,
			name: "Michael Jackson",
			age: 50,
			country: "USA",
			city: "Gary",
			state: "Indiana",
			nationality: "American",
			isActive: false
		},
		{
			id: 2,
			name: "Jackie Chan",
			age: 70,
			country: "China",
			city: "Hong Kong",
			state: "Hong Kong",
			nationality: "Chinese",
			isActive: true
		},
		{
			id: 3,
			name: "Jim Carrey",
			age: 60,
			country: "Canada",
			city: "Newmarket",
			state: "Ontario",
			nationality: "Canadian",
			isActive: true
		},
		{
			id: 4,
			name: "Dwayne Johnson",
			age: 50,
			country: "USA",
			city: "Hayward",
			state: "California",
			nationality: "American",
			isActive: true
		},
		{
			id: 5,
			name: "Madonna Louise Ciccone",
			age: 60,
			country: "USA",
			city: "Bay City",
			state: "Michigan",
			nationality: "American",
			isActive: true
		},
	]);

	const postsCollection = await getCollection("blog");

	await db.insert(Posts)
		.values(
			postsCollection.map((post) => ({
				id: crypto.randomUUID(),
				title: post.data.title,
				likes: Math.round(Math.random() * 100),
			}))
		);

	console.log("Seed Executed 👍🚀");
}
