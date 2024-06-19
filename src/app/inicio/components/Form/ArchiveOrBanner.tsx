import React from 'react'
import { useFormContext } from '../../hooks/useForm'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CardArchiveOrData = (functions:any) => {

    console.log(functions.type)

    return(
        <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="archivo">Archivo</Label>
        <Input id="archivo" type="file" onChange={(e: any) => {

            if(functions.type !== "banner"){
                functions.setFile(e.target.files[0])
            } 
            functions.setNameForm(e.target.files[0].name)
        }} required />
    </div>
    )
}




export default function ArchiveOrBanner({setFile}: any) {

    const {formState, setNameForm} = useFormContext()

    const FormType = formState.Form.type

    console.log(FormType)

    switch (FormType) {

        case "banner":
            return(
                <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="texto">Texto</Label>
                <Input  type="text" onChange={(e: any) => {

                    setNameForm(e.target.value)
                }} required />
                </div>
            );

        case "img": 
            return(
                <CardArchiveOrData setFile={setFile} setNameForm={setNameForm} type={FormType}/>
            )

            
        case "video": 
        return(
            <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="archivo">Archivo</Label>
            <Input id="archivo" type="file" onChange={(e: any) => {
                setFile(e.target.files[0])
                setNameForm(e.target.files[0].name)
            }} required />
        </div>
        )
    
        default:
            break;
    }

}
