import { Form } from './inicio/components/Form'
import { prisma } from '../libs/prisma'
import { loginIsRequiredServer } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Marquee from "./inicio/components/Marquee";
import { FormProvider } from "./inicio/context/FormProvider";
import { PostsProvider } from './inicio/context/PostProvider';
import Image from 'next/image';
import Nav from './inicio/components/Nav';
import { usePostsContext } from './inicio/hooks/usePosts'
import { useEffect } from 'react';

export default async function Home() {
  const session = await loginIsRequiredServer();

    console.log('sesion')
    console.log(session)


  return (
        <PostsProvider>
        <FormProvider>
    <main id="app" className="relative max-h-screen h-screen">
        <Nav session={session.user} />
      <section className="[grid-area:main] rounded-lg bg-neutral-900 overflow-auto">
        <Marquee session={session} />
      </section>
    </main>
          </FormProvider>
          </PostsProvider>
  );
}

