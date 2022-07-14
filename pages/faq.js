import React from "react";
import {images} from "../constant";
import API from "../src/api/api.service";
const api = new API();
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import LoadingBar from "react-top-loading-bar";
import SeoMeta from "../src/components/common/meta/seo_meta";

class FAQ extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            progress:0
        }
    }

    static async getInitialProps(ctx) {
        var faq = []
        await api.getAllFAQs(ctx.query.id,).then(async ( success) => {
            faq = success.data.response;
        });
        return {
            faq : faq
        }
    }
    componentDidMount() {
        this.setState({progress:30},()=>{
            setTimeout(() => {
                this.setState({ progress: 90 });
                if(this.props.faq?.length > 0){
                    this.setState({progress:100})
                }
                else{
                    this.setState({progress:0})
                    console.log(this.state.progress)
                }
            }, 1000)
        })
    }
    render(){
        const faq = this.props.faq;
        return(
            <>
                <SeoMeta title={"FAQ - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <LoadingBar progress={this.state.progress}  color="blue"/>
                <section className="static">
                    <div className="col-12 banner">
                        <img src={images.faq.default.src} alt=""/>
                        <div className="text">
                            <h3>Frequently asked questions</h3>
                            <h1>Ask Your Queries - Global Trade Plaza</h1>
                        </div>
                    </div>
                    <div className="container offer-acco pt-0">
                        <div className="row justify-content-center">
                            <div className="col-12 view">
                                <div className="accordion " id="accordionExample">
                                    {faq.length ? faq.map((faq) => {
                                       return <>
                                           <div className="card">
                                               <div className="card-header" id="heading-43">
                                                       <Accordion>
                                                           <AccordionSummary
                                                               expandIcon={<AddIcon />}
                                                               aria-controls="panel1a-content"
                                                               id="panel1a-header"
                                                           >
                                                               <Typography>{faq.question}</Typography>
                                                           </AccordionSummary>
                                                           <AccordionDetails>
                                                               <Typography>
                                                                   <div className="card-body">
                                                                       <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                                                                   </div>
                                                               </Typography>
                                                           </AccordionDetails>
                                                       </Accordion>
                                                           {/*<button className="btn btn-link collapsed" onClick={this.handleToggle}>{faq.question} </button>*/}
                                               </div>
                                           </div>
                                       </>
                                    }) : " "}
                            </div>
                        </div>
                        </div>
                    </div>

                </section>
            </>
        )
    }
}
export default FAQ;
