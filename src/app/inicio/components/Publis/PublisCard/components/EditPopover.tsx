import Image from 'next/image'
import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditPopover() {
  return (
      <Dialog>
      <DialogTrigger asChild>
      <Button  className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 p-0 flex justify-center items-center rounded-sm hover:bg-blue-600/10 transition' ><Image src='/iconos/edit.svg' alt='' width={20} height={20} /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
          <Button type="submit">Save changes</Button>
          </DialogClose>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
