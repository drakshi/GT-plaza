import React from "react";
import API from "../../../api/api.service";

const api = new API();

class PurchaseLeads extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {

        return (
            <>
                {this.props.active === "purchase_leads" ?
                    <div className="tab-pane active">

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

export default PurchaseLeads;



