'use client'

import Marquee from "./inicio/components/Marquee";
import { FormProvider } from "./inicio/context/FormProvider";
import Nav from './inicio/components/Nav';
import { useState } from "react";



export default function Home() {
  return (
    <FormProvider>

      <main id="app" className="flex-col-reverse max-h-screen h-screen">
        <Nav />
        <Marquee />
      </main>

    </FormProvider>
  );
}

