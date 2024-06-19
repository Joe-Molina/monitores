import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useFormContext } from '../../hooks/useForm'



const OptionType = ({type}: any) => {
    const {setTypeForm} = useFormContext()
    const handleClick = (e: any) => {
        setTypeForm(e.target.value)
    }
    return(
            <div className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={type} onClick={(e: any) => handleClick(e)} />
                <Label htmlFor={type}>{type}</Label>
            </div>

    )
}

export default function ArchiveType() {



  return (
    <>
    <label htmlFor="" className='font-bold'>Sube un Archivo</label>

    <RadioGroup defaultValue="img">
        <OptionType type="img"/>
        <OptionType type="video"/>
        <OptionType type="banner"/>
    </RadioGroup>
    </>
  )
}