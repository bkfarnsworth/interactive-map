"use client";
import Image from 'next/image'
import styles from './page.module.css'
import map from './hollowKnightMap.png'
import zoom from './zoom.js'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    document.addEventListener('wheel',zoom, {passive: false})
  },[])
  return (
    <div>
      <Image id='bigMap'
        src={map}
      />
    </div>
  )
}
