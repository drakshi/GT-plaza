import React from "react";
import Link from "next/link";
import {imageOptimization} from "../../../helper";
import image from "next/dist/client/image";

class HomeLeads extends React.Component {

    render() {

        return (
            <>
                <div className="list-main col-lg-6 col-md-12 col-12">
                    <div className="col-12 list t-box">
                        <h3>
                            <span>{this.props.title}</span>

                            {this.props.type === "2" &&
                                <Link href={"/search-leads"}>
                                    <a>View all leads</a>
                                </Link>
                            }

                            {this.props.type === "1" &&
                                <Link href={"/search-products"}>
                                    <a>View all products</a>
                                </Link>
                            }

                        </h3>
                        <div className="scroll-container">
                            <div className="data-list">
                                <ul className="scroll-text" id="seller_leads">
                                    {this.props.type === "2" && this.props.leads && this.props.leads.length ? this.props.leads.map((lead,index)=> {
                                        var url ="/lead/" + lead.slug;
                                        var flag = imageOptimization(lead.country?.flag,50);

                                        if (index < (this.props.leads.length /2)){
                                            return (
                                                <>
                                                    <li key={index}>
                                                        <Link href={url}>
                                                            <a>
                                                                <img width="30" height="auto" className="lazy"
                                                                     title={lead?.country?.name}
                                                                     alt={lead?.country?.name}
                                                                     src={flag}
                                                                />
                                                                <span> {lead.product_name} | {lead.quantity} <br/>{lead.created_at}</span>
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                    }
                                    }) : ""}


                                    {this.props.type === "1" && this.props.leads && this.props.leads.length ? this.props.leads.map((lead,index)=> {
                                        var url = "/product/" + lead.slug;
                                        var flag = imageOptimization(lead?.seller?.preference?.country?.flag,50);

                                        if (index < (this.props.leads.length /2)){
                                            return (
                                                <>
                                                    <li key={index}>
                                                        <Link href={url}>
                                                            <a>
                                                                <img width="30" height="auto" className="lazy"
                                                                     title={lead?.seller?.preference?.country?.name}
                                                                     alt={lead?.seller?.preference?.country?.name}
                                                                     src={flag}
                                                                />
                                                                <span> {lead.name} <br/>{lead.created_at}</span>
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                        }
                                    }) : ""}

                                </ul>
                            </div>

                            <div className="data-list">
                                <ul className="scroll-text" id="seller_leads">
                                    {this.props.type === "2" &&  this.props.leads && this.props.leads.length ? this.props.leads.map((lead,index)=> {
                                        var url = "/lead/" + lead.slug;
                                        var flag = imageOptimization(lead?.country?.flag,50);

                                        if (index > (this.props.leads.length /2)){
                                            return (
                                                <>
                                                    <li key={index}>
                                                        <Link href={url}>
                                                            <a>
                                                                <img width="30" height="auto" className="lazy"
                                                                     title={lead?.country?.name}
                                                                     alt={lead?.country?.name}
                                                                     src={flag}
                                                                />
                                                                    <span>{lead.product_name} | {lead.quantity} | <br/>{lead.created_at}</span>
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                        }
                                    }) : ""}


                                    {this.props.type === "1" && this.props.leads && this.props.leads && this.props.leads.length ? this.props.leads.map((lead,index)=> {
                                        var url = "/lead/" + lead.slug;
                                        var flag = imageOptimization(lead?.seller?.preference?.country?.flag,50);

                                        if (index > (this.props.leads.length /2)){
                                            return (
                                                <>
                                                    <li key={index}>
                                                        <Link href={url}>
                                                            <a>
                                                                <img width="30" height="auto" className="lazy"
                                                                     title={lead?.seller?.preference?.country?.name}
                                                                     alt={lead?.seller?.preference?.country?.name}
                                                                     src={flag}
                                                                />
                                                                <span>
                                                                    {lead.name} |
                                                                    {  lead?.product_trades[0]?.min_quantity - lead?.product_trades[0]?.max_quantity + " " + lead?.product_trades[0]?.unit?.name } |
                                                                    {lead?.product_trades[0]?.price}  <br/>{lead.created_at}
                                                                </span>
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                        }
                                    }) : ""}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};
export default HomeLeads;



