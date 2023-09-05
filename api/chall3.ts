// ここはimportなので気にしなくて大丈夫です
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import { ChallRes } from "./types.ts";

// ここから下はTypeScriptの型宣言で、HTTP リクエストボディにproductとcountがあることを示しています
const Chall2ReqBodySchema = z.object({
  password: z.string(),
});
export type Chall3ReqBody = z.infer<typeof Chall2ReqBodySchema>;

export function chall3(req: Chall3ReqBody): ChallRes {
  // ユーザが変な値を送ってきていないか確認しているだけなので気にしなくてOK
  const parseResult = Chall2ReqBodySchema.safeParse(req);
  if (!parseResult.success) {
    return { error: parseResult.error.message };
  }
  let password;
  try {
    password = Number(parseResult.data.password)
  } catch (_) {
    return { error: `password must be number` };
  }
  console.log(password);

  // 2桁か確認
  if (password < 0 || password > 99) {
    return { error: `password must be 2 digits` };
  }

  if (password === 85) {
    return { flag: "flag{this_is_flag}", message: "fantastic!" };
  } else {
    return { error: `wrong password` };
  }
}