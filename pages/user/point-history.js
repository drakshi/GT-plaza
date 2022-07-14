import React from "react";
import API from "../../src/api/api.service";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import {images} from "../../constant";
import SeoMeta from "../../src/components/common/meta/seo_meta";
const api = new API();

class PointHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            points: [],
        }
    }

    componentDidMount() {
        this.getCreditPoints();
    }

    getCreditPoints() {
        api.getCreditedPoints().then((success) => {
            this.setState({points: success.data.response});
        });
    }

    render() {
        return (
            <>
                <SeoMeta title={"Point history - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"dashboard"}/>
                            <div className="col-md-9 col-12 right p-gt">
                                <div className="heading main">
                                    <h3>Point history</h3>
                                </div>
                                <div className="tabbable-panel">
                                    <div className="tabbable-line">
                                        <div className="tab-content points-history">
                                            <div className="tab-pane active" id="all">
                                                <div className="col-12 t-box">
                                                    <div className="table" id="pointSummary">
                                                        <table>
                                                            <tbody>
                                                            {this.state.points.length > 0 && this.state.points.map((point, index) => {
                                                                return (
                                                                    <>
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <img src={images.points.default.src}/>
                                                                                <h5>{point.points} Points</h5>
                                                                            </td>
                                                                            <td><span>{point.parameter} </span></td>
                                                                            <td><span>{point.created_at} </span></td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default PointHistory;



