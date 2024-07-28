import React from 'react'
import { Button } from '../ui/button'

const Sidebar = () => {


    return (
        <section className='sticky top-4 flex flex-col mt-4 items-center justify-start p-2 rounded-md gap-4 min-w-80 bg-slate-100 h-full shadow-xl border border-black/25 '>
            <h2 className='text-3xl text-primary uppercase font-bold mt-4 ml-6 w-full'>Profilify</h2>
            <div className=' flex flex-col mt-8 gap-4 w-full p-4 h-full rounded-md'>
                <Button className='py-7 font-semibold'>
                    Introduction
                </Button>
                <Button className='py-7 font-semibold'>
                    Skills
                </Button>
                <Button className='py-7 font-semibold'>
                    Badges
                </Button>
                <Button className='py-7 font-semibold'>
                    Support
                </Button>
            </div>
        </section>
    )
}

export default Sidebar