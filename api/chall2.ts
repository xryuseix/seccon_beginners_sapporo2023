// ここはimportなので気にしなくて大丈夫です
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import { ChallRes } from "./types.ts";
import { getFlag } from "./flags.ts";

// ここから下はTypeScriptの型宣言で、HTTP リクエストボディにproductとcountがあることを示しています
const Chall2ReqBodySchema = z.object({
  product: z.string(),
  count: z.number(),
});
export type Chall2ReqBody = z.infer<typeof Chall2ReqBodySchema>;

// 商品はappleとbananaとflagがあり、それぞれの個数は10個, 20個, 0個です
const products: { [key: string]: number } = {
  apple: 10,
  banana: 20,
  flag: 0,
};

export function chall2(req: Chall2ReqBody): ChallRes {
  // ユーザが変な値を送ってきていないか確認しているだけなので気にしなくてOK
  const parseResult = Chall2ReqBodySchema.safeParse(req);
  if (!parseResult.success) {
    return { error: parseResult.error.message };
  }

  // ユーザの入力から商品名と個数を取得しています
  const product = parseResult.data.product;
  const count = parseResult.data.count;

  // 商品が存在するか確認しています
  if (!(product in products)) {
    return { error: `product ${product} not found` };
  }

  // 商品の個数が足りているか確認しています
  // products[product] - countというのは、商品の在庫がproducts[product]個で、ユーザがcount個購入しようとしています
  // この時、引き算の結果が0個以上の時は購入可能なので、購入処理ができたらメッセージを返します
  // 【ここが一番重要】なので、よく考えてみよう！
  if (products[product] - count >= 0) {
    if (product === "flag") {
      return { flag: getFlag('chall2'), message: "fantastic!" };
    } else {
      return { message: `ok, you got '${count}' of '${product}'` };
    }
  } else {
    // 商品を購入できなかった場合です
    // 例えば、appleは10個ですが11個購入しようとするとここの処理が実行されます
    return { error: `not enough '${product}'` };
  }
}

