"use client"

import { useEffect, useState } from "react"
import OrganizationModal from "../modals/organization-modal"


export const ModalProvider = ()=> {
    const [mounted, setMounted] = useState(false)

    useEffect(()=> {
        setMounted(true)
    })

    if(!mounted) return null

    return (
        <>
            <OrganizationModal />
        </>
    )
}