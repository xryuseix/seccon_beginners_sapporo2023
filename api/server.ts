import { chall2 } from "./chall2.ts";
import { chall3 } from "./chall3.ts";
import { ReqBody } from "./types.ts";

// ユーザのGETリクエストに関するクエリパラメータに応じて、適切なファイルを返しています
function getRouter(challType: string) {
  switch (challType) {
    case "1":
      return "public/chall1.html";
    case "2":
      return "public/chall2.html";
    case "3":
      return "public/chall3.html";
    default:
      return "public/index.html";
  }
}

// ユーザのPOSTリクエストに関するクエリパラメータに応じて、適切な関数を呼び出しています
function postRouter(challType: string, req: ReqBody) {
  switch (challType) {
    case "2":
      return chall2(req);
    case "3":
      return chall3(req);
    default:
      return new Response(`${challType} challenge is not found!`);
  }
}

// サーバの起動やリクエストの処理をしています
// この部分はあまり気にしなくて大丈夫です
// クエリパラメータとしてchall=1を指定すると、chall1関数が呼び出されます
// また、chall2, chall3はPOSTリクエストでJSON形式のリクエストボディを送信する必要があります
// 例えば、chall2の場合は以下のようにcurlコマンドを実行します
// curl -X POST localhost:8000\?chall=2 -H "Content-Type: application/json" -d '{"product":"apple", "count": 5}'
export default async (req: Request) => {
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries());

  const method = req.method.toUpperCase();
  if (method === "GET") {
    const path = getRouter(query.chall);
    const html = await Deno.readTextFile(path);
    return new Response(html, {
      headers: {
        "content-type": "text/html",
      },
    });
  } else if (method === "POST") {
    if (typeof query.chall === "undefined") {
      return new Response("param 'chall' is required!");
    }
    try {
      const body = JSON.parse(await new Response(req.body).text());
      const result = postRouter(query.chall, body);
      return new Response(JSON.stringify(result));
    } catch (e) {
      return new Response(e.message);
    }
  } else {
    return new Response(`method ${method} is not allowed!`);
  }
};