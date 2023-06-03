"use client";
import Image from 'next/image'
import styles from './page.module.css'
import map from './hollowKnightMap.png'
import zoom from './zoom.js'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    document.addEventListener('wheel', zoom, { passive: false })
    return function () { document.removeEventListener('wheel', zoom) }
  }, [])
  useEffect(() => {
    var isDragging = false;
    var mouseDownX, mouseDownY, scrollLeft, scrollTop;

    // Handle mouse down event
    document.querySelector('body').addEventListener('mousedown', function (event) {
      event.preventDefault();
      isDragging = true;
      mouseDownX = event.clientX;
      mouseDownY = event.clientY;
      scrollLeft = window.scrollX;
      scrollTop = window.scrollY;
    });

    // Handle mouse move event
    document.querySelector('body').addEventListener('mousemove', function (event) {
      if (!isDragging) return;
      event.preventDefault();
      var deltaX = event.clientX - mouseDownX;
      var deltaY = event.clientY - mouseDownY;
      window.scrollTo( scrollLeft - deltaX, scrollTop - deltaY)
      console.log(deltaX)
    });

    // Handle mouse up event
    document.querySelector('body').addEventListener('mouseup', function () {
      isDragging = false;
      console.log("hohoho")
    });

    // Handle mouse leave event
    document.querySelector('body').addEventListener('mouseleave', function () {
      isDragging = false;
      console.log("haha")
    });
  }, [])
  return (
    <div>
      <Image id='bigMap'
        src={map}
      />
    </div>
  )
}
