import React from 'react'
import {Link} from "react-router-dom" 
// import blank_image from "./cropped_image.png"

function MemberCard({member}) {
    return (
        <div className='col-sm-3'>
            <div className='card mt-5'>
            <img className="card-img-top" src={member.cand_image} alt=""></img>
                <div className='card-body'>
                <h4 className="card-title" style={{'textAlign':'center'}}>{member.cand_firstname} {member.cand_lastname}</h4>
                <p className="card-text">
                    OpenSecrets ID: {member.cand_crp_id} <br></br>
                    Cycle: {member.cycle} <br></br>
                    Office: {member.cand_office==='s'?'Senate':'House'} <br></br>
                    Party: {member.cand_party} <br></br>
                    State: {member.cand_state} <br></br>
                </p>
                <Link to={`/CampFin/${member.cand_crp_id}`}>Learn more...</Link>
                </div>
            </div>
        </div>
    )
}

export default MemberCard
