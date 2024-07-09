'use client'

import Marquee from "./inicio/components/Marquee";
import { FormProvider } from "./inicio/context/FormProvider";
import { PostsProvider } from './inicio/context/PostProvider';

import Nav from './inicio/components/Nav';
import { useState } from "react";
import { IpProvider } from "./inicio/context/IpProvider";


export default function Home() {
  return (
    <PostsProvider>
      <FormProvider>
        <IpProvider>
          <main id="app" className="flex-col-reverse max-h-screen h-screen">
            <Nav />
            <Marquee />
          </main>
        </IpProvider>
      </FormProvider>
    </PostsProvider>
  );
}

