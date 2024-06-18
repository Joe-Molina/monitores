import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

function ArchiveType() {
    const [viewBanner, setViewBanner] = useState(false)
    const [type, setType] = useState('img')

  return (
    <>
        <label htmlFor="" className='font-bold'>Sube un Archivo</label>



        <RadioGroup defaultValue="img">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="img" id="img" onClick={(e: any) => { const string = (e.target.value); setType(string); setViewBanner(false);}} />
                <Label htmlFor="img">img</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="option-two" onClick={(e: any) => { const string = (e.target.value); setType(string); setViewBanner(false);}} />
                <Label htmlFor="option-two" >video</Label >

            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="banner" id="option-3" onClick={(e: any) => { const string = (e.target.value); setType(string); setViewBanner(true);}} />
                <Label htmlFor="option-3" >banner</Label >

            </div>
        </RadioGroup>
    </>
  )
}

export default ArchiveType