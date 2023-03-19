export { default } from "next-auth/middleware"

export const config = { matcher: ["/_feed", "_feed/manage", "/account"] }