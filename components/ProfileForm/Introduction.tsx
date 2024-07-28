import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const Introduction = () => {
    return (
        <div className='w-full h-full flex flex-col gap-4'>
            <h2 className='text-xl font-semibold self-start'>Header Image</h2>
            <Card className='w-full'>
                <CardHeader>
                    Image Url
                </CardHeader>
                <CardContent>
                    <Input placeholder='Http://example-url.com' type='url' />
                </CardContent>
            </Card>
            <h2 className='text-xl font-semibold self-start'>Introduction</h2>
            <Card className='w-full'>
                <CardHeader>
                    Hi, my Name is
                </CardHeader>
                <CardContent>
                    <Input placeholder='John Doe' />
                </CardContent>
            </Card>

            <h2 className='text-xl font-semibold self-start'>About me</h2>
            <Card className='w-full'>
                <CardHeader>
                    Hi, my Name is
                </CardHeader>
                <CardContent>
                    <Textarea placeholder='John Doe' />
                </CardContent>
            </Card>
            <h2 className='text-xl font-semibold self-start'>Currently Doing</h2>
            <Card className='h-full w-full'>
                <CardContent className=' flex flex-col justify-center items-center gap-2 mt-4'>
                    <Input placeholder='🔭 I’m currently working on ' value='🔭 I’m currently working on' />
                    <Input placeholder='🌱 I’m currently learning' />
                    <Input placeholder='❓ Ask me about anything related' />
                    <Input placeholder='⚡ Fun fact: ' />
                </CardContent>
            </Card>
        </div>
    )
}

export default Introduction