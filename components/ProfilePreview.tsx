import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const ProfilePreview = () => {
    return (
        <div className='flex flex-col justify-start items-center bg-card p-4 h-full w-full border border-black/25 shadow-lg rounded-md'>
            <Card className='h-full w-full p-4'>
                <CardTitle>
                    Preview
                </CardTitle>
                <CardHeader>
                    Introduction
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
    )
}

export default ProfilePreview