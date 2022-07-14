import React from "react";
import {connect} from "react-redux";
import Link from "next/link";

class AllCategories extends React.Component {

    render() {

        return (
            <>
                <section className="list-category">
                    <div className="container list-main">
                        <div className="col-12 header">
                            <div className="row">
                                <div className="col-12 breadcrumb mt-3">
                                    <div className="col-md-3 navigation">
                                        <p><Link href="/"><a>Home</a></Link> | Supplier </p>
                                    </div>
                                </div>
                                <div className="col-12">

                                    {this.props?.getSupplierCategories?.get_categories?.data?.length ? this.props?.getSupplierCategories?.get_categories?.data.map((category, index) => {

                                        return (<>
                                            <div className="col-12 list t-box" key={index}>
                                                <div className="head col-12">
                                                    <Link href={"/suppliers/" + category.slug}>
                                                        <a>
                                                            <h4 style={{"color": "#222831"}}>{category.name}</h4>
                                                        </a>
                                                    </Link>
                                                </div>

                                                {category?.hidden_children?.length ? category?.hidden_children.map((sub_category, index) => {
                                                    return (
                                                        <>
                                                            <ul>
                                                                <li key={index}>
                                                                    <Link href={"/suppliers/" + category.slug + "/" + sub_category.slug}>
                                                                        <a style={{"color": "#fe3456"}}>
                                                                            {sub_category.name}
                                                                        </a>
                                                                    </Link>
                                                                </li>

                                                                {sub_category?.list_children?.length ? sub_category?.list_children.map((children, child_index) => {

                                                                    if (child_index <= 4) {
                                                                        return (<>
                                                                            <li key={index}>
                                                                                <Link href={"/suppliers/" + category.slug + "/" + sub_category.slug + "/" + children.slug }>
                                                                                    <a>{children.name}</a>
                                                                                </Link>
                                                                            </li>
                                                                        </>)
                                                                    }

                                                                }) : ""}
                                                            </ul>
                                                        </>
                                                    )
                                                }) : ""}
                                            </div>
                                        </>)

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

const mapStateToProps = (state) => ({
    getSupplierCategories: state.CategoryReducer,
});

export default connect(mapStateToProps, null)(AllCategories);



