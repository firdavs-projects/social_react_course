import React from 'react'

function Tags({ tags }) {
    return (
        <>
            теги: {tags.map(o => <button key={o}>#{o}</button>)}
        </>
    )
}
export default Tags
