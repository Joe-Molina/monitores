import Marquee from "./inicio/components/Marquee";
import { FormProvider } from "./inicio/context/FormProvider";
import { PostsProvider } from './inicio/context/PostProvider';

import Nav from './inicio/components/Nav';


export default async function Home() {
  return (
        <PostsProvider>
        <FormProvider>
    <main id="app" className="flex-col-reverse max-h-screen h-screen">
        <Nav  />
        <Marquee />
    </main>
          </FormProvider>
          </PostsProvider>
  );
}

