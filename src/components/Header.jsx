'use client'
import Link from 'next/link'

export default function Header() {
    return (
        <div className={'header'}>
            <Link href={'https://rickandmortyapi.com/documentation'} className={'hover'}>Docs</Link>
            <Link href={'https://rickandmortyapi.com/about'} className={'hover'}>About</Link>
            <Link href={'https://rickandmortyapi.com/support-us'} className={'hover'}>SUPPORT US</Link>
        </div>
    )
}