import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handle(req: any, res: any) {
  const { name, details, tags } = req.body;
  try {
    const data = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: {
        Details: {
          rich_text: [
            {
              text: {
                content: details,
              },
            },
          ],
        },
        Tags: {
          multi_select: tags,
        },
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
      },
    });
    res.send(data);
  } catch (error) {
    console.error(error);
  }
}
