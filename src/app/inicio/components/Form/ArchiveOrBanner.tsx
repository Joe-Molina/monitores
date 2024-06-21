import React from 'react'
import { useFormContext } from '../../hooks/useForm'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CardArchive = (functions:any) => {
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


const CardNameBanner = (functions:any) => {
    return(
        <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="texto">Texto</Label>
        <Input  type="text" onChange={(e: any) => {

            functions.setNameForm(e.target.value)
        }} required />
        </div>
    )
}



export default function ArchiveOrBanner({setFile}: any) {
    const {formState, setNameForm} = useFormContext()
    const FormType = formState.Form.type

    switch (FormType) {

        case "banner":
            console.log(FormType)
            return(
                <CardNameBanner setNameForm={setNameForm}/>
            );

        case "img": 
        console.log(FormType)
            return(
                <CardArchive setFile={setFile} setNameForm={setNameForm}/>
            )

            
        case "video": 
        console.log(FormType)
        return(
                <CardArchive setFile={setFile} setNameForm={setNameForm}/>
        )
    
       
    }

}
