import React from "react";
import {images} from "../constant";
import Link from "next/link";
import API from "../src/api/api.service";
import SeoMeta from "../src/components/common/meta/seo_meta";
import LoadingBar from "react-top-loading-bar";
const api = new API();

class RegionList extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            progress:0
        }
    }

    static async getInitialProps(ctx) {
        var regions = [] ;

        await api.getAllRegions().then(success => {
            regions = success.data.response;
        });

        return {
            regions: regions,
        }
    }
    componentDidMount() {
        this.setState({progress:30},()=>{
            setTimeout(() => {
                this.setState({ progress: 90 });
                if(this.props.regions?.length > 0){
                    this.setState({progress:100})
                }
                else{
                    this.setState({progress:0})
                    console.log(this.state.progress)
                }
            }, 1000)
        })
    }
    render() {

        return (
            <>
                <LoadingBar progress={this.state.progress} color="#004099" />
                <SeoMeta title={"Search your Companies of different region – Global Trade Plaza"}
                         description={"Global Trade Plaza is the Best B2B Lead Generation Company, We have the Leads of Top Wholesale companies and Manufacturers in the World"}/>

                <section className="region-list">
                    <div className="container list-main">
                        <div className="col-12 header">
                            <div className="row">
                                <div className="col-10 breadcrumb mt-3">
                                    <p>
                                        <Link href="/">
                                            Home
                                        </Link> |
                                        <span> Companies by region</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 p-0" id="region_countries">
                            {
                                this.props.regions ? this.props.regions.map((region,index)=>{

                                    return (
                                        <>
                                            <div className="col-12 list t-box" key={index}>
                                                <div className="head col-12">
                                                    <h4>{region.name}</h4>
                                                </div>
                                                <div className="row">
                                                { region?.countries.length ? region?.countries.map((country,index)=>{
                                                    return (
                                                        <>
                                                                 <div className="col-md-3 country main_country">
                                                                     <Link href={"/region/"+country.slug}>
                                                                         <a>
                                                                             <img className="lazy" title={country.name}
                                                                                  src={country.flag}
                                                                                  alt={country.name} />
                                                                             <span>{country.name}</span>
                                                                         </a>
                                                                     </Link>
                                                                 </div>
                                                        </>
                                                    )
                                                    }) : "" }
                                                </div>
                                            </div>
                                        </>
                                    )

                                }) : ""
                            }
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default RegionList;
