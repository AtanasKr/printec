import React from 'react'

const Container = ({ data }) => {
    return (
        <div>
            <ul className='listHolder'>
                {data&&data.map(el => (
                    <li key={el._id}>
                        <p>Place name: {el.placeName}</p>
                        <p>State: {el.state}</p>
                        <div className='list-line'></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Container