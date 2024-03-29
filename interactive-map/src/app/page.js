"use client";
import Image from 'next/image'
import styles from './page.module.css'
import map from './hollowKnightMap.png'
import zoom from './zoom.js'
import { panMouseDown, panMouseMove, panMouseUp, panMouseLeave } from './pan.js'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    document.querySelector('#mapContainer').addEventListener('wheel', (event) => { zoom(event) }, { passive: false })
    return function () { document.querySelector('#mapContainer').removeEventListener('wheel', zoom) }
  }, [])
  useEffect(() => {
    document.querySelector('#mapContainer').addEventListener('mousedown', panMouseDown);

    document.querySelector('#mapContainer').addEventListener('mousemove', (event) => { panMouseMove(event) });

    document.querySelector('#mapContainer').addEventListener('mouseup', panMouseUp);

    document.querySelector('#mapContainer').addEventListener('mouseleave', panMouseLeave);
  }, [])
  return (
    <div id='edge'>
      <div id='mapContainer'>
        <div id='bigMap' >
        <Image id='mapActual' className='image'
          src={map}
        />
        </div>
      </div>
      <div id='coordView'>
      </div>
    </div>
  )
}
