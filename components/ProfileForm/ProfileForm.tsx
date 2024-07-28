import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import Introduction from './Introduction'
import Skills from './Skills'

const ProfileForm = () => {
    return (
        <div className=' sticky top-4 flex flex-col w-full justify-start items-center gap-4 bg-card p-4 h-full border border-black/25 shadow-lg rounded-md'>
            <Introduction />
            <Skills />
        </div>
    )
}

export default ProfileForm