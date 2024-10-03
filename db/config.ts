import { column, defineDb, defineTable } from 'astro:db';

 const Clients = defineTable({
  columns: {
    id: column.number({
      primaryKey: true,
    }),
    name: column.text(),
    age: column.number(),
    country: column.text(),
    city: column.text(),
    state: column.text(),
    nationality: column.text(),
    isActive: column.boolean({
      default: false,
    }),
  },
 });

// https://astro.build/db/config
export default defineDb({
  tables: {
    Clients,
  }
});
