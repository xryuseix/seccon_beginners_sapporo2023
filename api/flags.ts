const DEV_MODE = true;

type Flags = {
  chall2: string;
  chall3: string;
};

const devFlags = {
  chall2: "ctf4b{chall2_flag}",
  chall3: "ctf4b{chall3_flag}",
};

const prodFlags = {
  chall2: "ctf4b{r3qu35t_15_r3wr1t4bl3}",
  chall3: "ctf4b{y0u_4r3_burp_m@5t3r!}",
};

export function getFlag(chall: keyof Flags, isDev: boolean = DEV_MODE): string {
  if (isDev) {
    return devFlags[chall];
  } else {
    return prodFlags[chall];
  }
}

export const password = DEV_MODE ? 85 : 73;
