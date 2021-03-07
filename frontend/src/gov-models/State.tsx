import React from 'react';

function States(){
    return (
        <div>
            <li>Texas</li>
                <ul>
                <li>
                    <a href={"/DELL"}>DELL</a>
                </li>
                </ul>
            <li>California</li>
                <ul>
                <li>
                    <a href={"/HPQ"}>HPQ</a>
                </li>
                </ul>
            <li>Georgia</li>
                <ul>
                <li>
                    <a href={"/GOOG"}>GOOG</a>
                </li>
                </ul>
        </div>
    )
}
export default States