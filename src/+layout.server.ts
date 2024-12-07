import type { LayoutServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
 
export const load: LayoutServerLoad = async (event: RequestEvent) => {
  return {
    session: await event.locals.auth()
  };
};