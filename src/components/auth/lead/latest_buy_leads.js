import React from "react";
import API from "../../../api/api.service";

const api = new API();

class LatestBuyLeads extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {

        return (
            <>
                {this.props.active === "latest_leads" ?
                    <div className="tab-pane">
                        <div>
                            <div id="purchase_lead_wrap">

                            </div>
                        </div>
                    </div>
                    : ""}
            </>
        )
    }
}

export default LatestBuyLeads;



