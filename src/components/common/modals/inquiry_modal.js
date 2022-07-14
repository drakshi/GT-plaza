import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import RequirementForm from "../home/requirement_form";
import {withRouter} from "next/router";
import UserInfoModal from "./user_info_modal";


const InquiryModal = (props) => {

    let [show, setShow] = useState(false);
    let [hide, setHide] = useState(false);
    let [data, setData] = useState({});
    let [type, setType] = useState(1);
    let [productInfo, setProductInfo] = useState(null);

    function checkModalStatus(value) {
        if (value?.status === true && value?.status === show) {
            setShow(!value.status);
            setHide(value.status);
            setData(value.data);
        }
    }

    function changeHandler(event) {
        if (event?.submitted === true) {
            setHide(!hide);
            setData({
                product_name: null,
                quantity: null,
                unit_id: null,
                shipping_terms: null,
                payment_modes: [],
                description: null
            })
        }
        if (event.show === false){
            setHide(!hide);
        }
    }

    useEffect(() => {
        if (show !== props.show) {
            setShow(props.show)
        }
        if (type !== props.type) {
            setType(props.type)
        }
        if (productInfo !== props.product_info) {
            setProductInfo(props.product_info)
        }
    }, [props]);


    useEffect(() => {
        props.checkStatus(show)
    }, [show]);


    return (
        <>
            <Modal size="lg" show={show} onHide={() => {
                setShow(false)
            }} className="storeModal mr-5">
                <Modal.Body>
                    <Modal.Title>
                        What are you looking for ?
                    </Modal.Title>
                    <div className="col-12 pt-3">
                        {/*Requirement form for inquiry */}
                        <RequirementForm product_info={productInfo} type={type} checkModalStatus={(e) => checkModalStatus(e)}/>
                    </div>
                    <div className="col-12 text-center">
                        <a className="close-modal text-danger" id="not_submit" type="button"
                           data-dismiss="modal" aria-label="Close"
                           onClick={() => {
                               setShow(false)
                           }}>
                            Not now
                        </a>
                    </div>
                </Modal.Body>
            </Modal>

            {/*User info modal triggered from Requirement form for inquiries only*/}
            {type !== 1 &&
                 <UserInfoModal post={changeHandler} info={data} type={type} show={hide}/>
             }
        </>)
};
export default withRouter(InquiryModal);



