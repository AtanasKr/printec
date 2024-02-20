import React from 'react'

const Result = ({dbData}) => {
    const placeName = dbData.locations[0].placeName;
    const placeState = dbData.locations[0].state;
  return (
    <div className='result-container'><p>Current place:{placeName}</p><p>Current state:{placeState}</p></div>
  )
}

export default Result