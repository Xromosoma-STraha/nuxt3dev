// server/api/logout.post.ts
import { defineEventHandler, setHeader } from 'h3'

export default defineEventHandler((event) => {  
  setHeader(event, 'Set-Cookie', `token=; HttpOnly; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;${process.env.NODE_ENV === 'production' ? ' Secure;' : ''}`);
	event.node.res.statusCode = 200;
  return { message: 'Logout successful' };
});