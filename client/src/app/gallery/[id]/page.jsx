
import React from 'react'

// App/gallery/[id]/page.jsx

import Imagegallery from "../../../components/Image_gallery.jsx"

const Page = ({ params }) => {
    const { id } = params  // Extract `id` from the params object
  
    return (
      <div>
       <Imagegallery eventid={id}></Imagegallery>
      </div>
    )
  }
  
  export default Page
  