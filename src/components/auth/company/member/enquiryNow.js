import React from 'react'
import RequirementForm from "../../../common/home/requirement_form";

class EnquiryNow extends React.Component{
    render(){
        return(
            <>
                <div className="col-12 t-box cards contactDetails">
                    <div className="head col-12">
                        <h4>Enquire now</h4>
                    </div>
                    {/*  Requirement Form  */}
                    <RequirementForm type={3} />
                </div>
            </>
        )
    }
}
export default EnquiryNow;
