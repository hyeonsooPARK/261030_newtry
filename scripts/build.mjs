import { mkdir, copyFile, cp, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

// .env 파일 불러오기
if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

// Supabase 환경변수 확인
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error("Supabase URL 또는 KEY가 없습니다. .env를 확인하세요.");
}

// 설정 파일 자동 생성
await writeFile(
  "src/supabase-config.js",
  `export const supabaseUrl = ${JSON.stringify(url)};
export const supabaseKey = ${JSON.stringify(key)};
`
);

console.log("Supabase 설정 파일 생성 완료");

// 기존 빌드
await rm("dist", { recursive: true, force: true });
await mkdir("dist");
await copyFile("index.html", "dist/index.html");
await cp("src", "dist/src", { recursive: true });

console.log("Built static prototype -> dist"); 