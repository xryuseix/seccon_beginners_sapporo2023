// このファイルでは、HTTPレスポンスとしてメッセージ(+フラグ)またはエラーを返すことがわかります

import { Chall2ReqBody } from "./chall2.ts";
import { Chall3ReqBody } from "./chall3.ts";

export type ChallRes =
  | {
      flag?: string;
      message: string;
    }
  | {
      error: string;
    };

export type ReqBody = Chall2ReqBody & Chall3ReqBody;
