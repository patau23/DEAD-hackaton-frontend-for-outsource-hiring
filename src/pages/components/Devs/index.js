import React from 'react'

import CustomCard from '../Card'

const Devs = ({ devs }) => {
  return (
    <>
      {devs.map((dev, i) => (
        <CustomCard key={i} dev={dev} />
      ))}
    </>
  )
}

export default Devs
