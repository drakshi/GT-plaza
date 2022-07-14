import React from "react";
import Layout from "../src/components/filters/layout";
import API from "../src/api/api.service";
import SeoMeta from "../src/components/common/meta/seo_meta";
import LoadingBar from "react-top-loading-bar";
import Router from "next/router";
import {EventEmitter} from "../src/helper";
const api = new API();

class SearchLeads extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initial_ssr : 1,
            progress:0,
            page: 1,
            lead_count : null,
            country: null,
            main_category: null,
            child_category: null,
            category: null,
            keyword : null,
            leads : [],
        };
        this.handler = this.handler.bind(this);
    }

    componentDidMount() {
        EventEmitter.subscribe('initialLeads', () => {
            this.initialLeads();
        });
    }

    initialLeads(){
        this.setState({
            initial_ssr : 1,
            leads : []
        })
    }

    /* static async getInitialProps(ctx) {
        var leads = [];
        var lead_count = 0;
        await api.getAllLeads({page: 1}).then((success) => {
            leads = success.data.response?.leads ;
            lead_count = success.data.response?.totalCount ;
        });
        return {
            leads: leads,
            lead_count : lead_count
        }
    }*/
    getFilterLeads() {
        this.setState({progress:30 , initial_ssr : 0},()=>{
            setTimeout(() => {
                this.setState({ progress: 90 });
            }, 500)
        });
        api.getAllLeads({
                keyword : this.state.keyword,
                page: this.state.page,
                country : parseInt(this.state.country),
                main_cate: parseInt(this.state.main_category),
                child_cate: parseInt(this.state.child_category),
                category : parseInt(this.state.category)
            },
        ).then((success) => {
            this.setState({
                progress:100,
                leads: success.data.response?.leads,
                lead_count: success.data.response?.totalCount
            })
        }).catch((error) => {
            this.setState({
                progress:100,
                errorAlert: error.response.data.message,
            });
        });
    }


    handler(val) {
        this.setState(
            {
                page : val?.page,
                country: val?.country,
                main_category: val?.main_category,
                child_category: val?.sub_category,
                category: val?.child_category,
            }
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (Router?.query &&  Router?.query?.keyword && Router?.query?.keyword !== this.state.keyword ){
            this.setState({keyword :  Router?.query?.keyword },()=>{
                this.getFilterLeads();
            })
        }
        if (prevState.country !== this.state.country){
            this.getFilterLeads();
        }
        if (prevState.main_category !== this.state.main_category){
            this.getFilterLeads();
        }
        if (prevState.child_category !== this.state.child_category){
            this.getFilterLeads();
        }
        if (prevState.category !== this.state.category){
            this.getFilterLeads();
        }
        if (prevState.page !== this.state.page){
            this.getFilterLeads();
        }
    }


    render() {
        if(this.props.lead_count<0){
            this.setState({progress:0})
        }
        return (<>
            <LoadingBar progress={this.state.progress} color="blue" />

            <SeoMeta title={"Global Trade Plaza | Search Leads"}
                     description={"Search for your Leads on Largest B2B Marketplace in India, Best B2B Marketplace in India, Top B2B Lead Generating Company in India."}/>
            <Layout readCategories={this.handler}
                    active={2}
                    type="Leads"
                    initial_ssr={this.state.initial_ssr}
                    title="Best B2B Lead Generation Company in India"
                    list={this.state.leads.length ? this.state.leads : this.state.initial_ssr === 1 ? this.props.leads : this.state.leads }
                    count={this.state.lead_count ? this.state.lead_count : this.state.initial_ssr === 1 ? this.props.lead_count : this.state.lead_count}
            />
        </>)
    }
}

   export async function getStaticProps(ctx) {
    var leads = [];
    var lead_count = 0;
    await api.getAllLeads({page: 1}).then((success) => {
        leads = success.data.response?.leads ;
        lead_count = success.data.response?.totalCount ;
    }).catch(err=>{console.log(err)});
    return {
        props:{leads,lead_count,fallback:false}
    }
}
export default SearchLeads;



