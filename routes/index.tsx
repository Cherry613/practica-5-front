import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Filtro from "../islands/Filtro.tsx";
import { Film } from "../types.ts";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Film[]>) => {
    const response = await fetch("https://filmapi.vercel.app/api/films");

    if(!response){
      return new Response("Error fetching Films", {status: 500})
    }

    const data = await response.json();

    return ctx.render(data);
  }
}


export default function Home(props: PageProps<Film[]>) {
  return (
    <div  class="fondo">
      <Filtro props={props.data}/>
    </div>
  );
}