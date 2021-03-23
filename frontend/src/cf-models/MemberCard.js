import React from 'react'
import {Link} from "react-router-dom" 

function MemberCard({member}) {
    return (
        <div className='col-sm-3'>
            <div className='card'>
            <img className="card-img-top" src={member.cand_image} alt=""></img>
                <div className='card-body'>
                <h4 className="card-title">{member.firstname} {member.lastname}</h4>
                <p className="card-text">
                    stuff
                </p>
                <Link to={`/CampFin/${member.cand_crp_id}`}>Learn more</Link>
                </div>
            </div>
        </div>
    )
}

export default MemberCard
