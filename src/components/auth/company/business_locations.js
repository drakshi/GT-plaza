import React from "react";
import LocationForm from "./location_form";
import API from "../../../api/api.service";
import {NotificationManager} from "react-notifications";
import LoadingBar from "react-top-loading-bar";

const api = new API();

class BusinessLocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress:0,
            locations: [],
            update : false
        },
        this.locationHandler = this.locationHandler.bind(this);
        this.removeBusinessLocation = this.removeBusinessLocation.bind(this);
    }

    locationHandler(value) {
        if (value && value?.type === 2 && value.locations.length !== this.state.locations.length) {
            this.setState({locations: value.locations,update : false})
        }
    }

    removeBusinessLocation(id) {
        api.removeBusinessLocation(id,
            this.setState({progress:30}),
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 1000)
        ).then((success) => {
                this.setState({update:true, progress:100});
                NotificationManager.success("business location removed successfully");
            }
        );
    }

    render() {

        return (
            <>
                <header>
                    <LoadingBar progress={this.state.progress} color="blue"/>
                </header>
                <div className={this.props.active === "business_location" ? "tab-pane active" : "tab-pane"} id="office">
                    <div className="col-12 t-box">
                        <div className="heading">
                            <h3>Head Office</h3>
                        </div>
                        <LocationForm type={1} locationHandler={this.locationHandler} update={this.state.update}/>
                    </div>

                    <div className="col-12 t-box brnach-table"
                         id="branchListTable">
                        <div className="heading mb-2">
                            <h3>Branches</h3>
                        </div>
                        <div className="col-12 card-content1 px-3 pt-1">
                            <div className="row" id="branchList">
                                {!!this.state.locations.length && this.state.locations.map((location, index) => {
                                    return (
                                        <>
                                            <div className="col-12 col-md-4 col-lg-4 col-xl-4 location-main" key={index}>
                                                <div className="t-box p-3 location-card">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col my-auto">
                                                                <h5 className="mb-0 fw-bold">Location details</h5>
                                                            </div>
                                                            <div className="col-auto">
                                                                <a href="javascript:void(0)" className="delete" onClick={()=>{
                                                                    this.removeBusinessLocation(location.id)
                                                                }}>
                                                                    Delete
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="location-details">
                                                            <div className="col-12">
                                                                <div className="row">
                                                                    <div className="col-md-auto">
                                                                        <p className="text-muted mb-0 mb-md-2">Office location</p>
                                                                        <h6 className="font-weight-bold d-block d-md-none">{location?.country?.name}</h6>
                                                                        <p className="text-muted mb-0 mb-md-2">State</p>
                                                                        <h6 className="font-weight-bold d-block d-md-none">{location?.state}</h6>
                                                                        {location?.city &&
                                                                             <p className="text-muted mb-0 mb-md-2">City</p>
                                                                        }
                                                                        {location?.city &&
                                                                             <h6 className="font-weight-bold d-block d-md-none">{location?.city}</h6>
                                                                        }
                                                                        <p className="text-muted mb-0 mb-md-2">Zipcode </p>
                                                                        <h6 className="font-weight-bold d-block d-md-none">{location?.zip_code}</h6>
                                                                        <p className="mb-0 text-muted mb-0 mb-md-2">Street Address </p>
                                                                        <h6 className="font-weight-bold d-block d-md-none mb-0">{location?.street_address}</h6>
                                                                    </div>
                                                                    <div className="col d-none d-md-block">
                                                                        <p className="mb-md-2">{location?.country?.name}</p>
                                                                        <p className="mb-md-2">{location?.state}</p>
                                                                        {location?.city &&
                                                                            <p className="mb-md-2">{location?.city}</p>
                                                                        }
                                                                        <p className="mb-md-2">{location?.zip_code}</p>
                                                                        <p className="mb-0">{location?.street_address}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 t-box">
                        <div className="heading">
                            <h3>Add your branch details (If any)</h3>
                        </div>
                        <LocationForm type={2} locationHandler={this.locationHandler} update={this.state.update}/>
                    </div>
                </div>
            </>
        )
    }
}

export default BusinessLocation



