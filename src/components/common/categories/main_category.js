import React from "react";
import Link from "next/link";

class MainCategory extends React.Component {

    render() {

        return (
            <>
                <section className="list-category mt-4">
                    <div className="container list-main">
                        <div className="col-12 header">
                            <div className="row main-render-category">
                                <div className="col-12 breadcrumb">
                                    <div className="col-md-12 p-0">
                                        <p>
                                            <Link href="/">
                                                <a className="mr-1">Home</a>
                                            </Link>
                                            |{' '}
                                            <Link href={"/suppliers"}>
                                                <a className="mr-1">Supplier</a>
                                            </Link>
                                            |{' '}
                                            {this.props.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 p-0 single-category">
                                    <div className="col-12 list t-box">
                                        <div className="head col-12">
                                            <h4 className="mb-4"> {this.props.name}</h4>
                                            <p className="mb-2"> {this.props.description}</p>
                                        </div>
                                    </div>

                                    {this.props.list?.list_children ? this.props.list?.list_children.map((sub_category,index) => {

                                        return (
                                            <>
                                                <div className="col-12 list t-box" key={index}>
                                                    <div className="head col-12">
                                                        <h4>{sub_category.name}</h4>
                                                    </div>
                                                    <div className="col-12 grid-item">
                                                        <div className="row justify-content-center"
                                                             id="allProducts">
                                                            {sub_category?.list_children ? sub_category?.list_children.map((child_category, index) => {

                                                                if (index < 5) {
                                                                    return (
                                                                        <>
                                                                            <div className="col tile" key={index}>
                                                                                <Link href={"/suppliers/" + this.props.list?.slug + "/" + sub_category?.slug + "/" + child_category?.slug }>
                                                                                    <a>
                                                                                        <img width="90" height="90" src={child_category.image}/>
                                                                                        <p className="singleProduct">{child_category.name}</p>
                                                                                    </a>
                                                                                </Link>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                            }) : ""}

                                                            <div className="col-12 text-center mt-3">
                                                                <Link href="">
                                                                    <a>
                                                                        <button className="btn">Explore all</button>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }) : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
};


export default MainCategory;



