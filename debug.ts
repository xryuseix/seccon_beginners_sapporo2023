import handler from "./api/server.ts";

Deno.serve(async (req: Request) => {
    return await handler(req);
});