import React from "react";
import Link from 'next/link';
import {imageOptimization} from "../../../helper";


class CategoryProducts extends React.Component {

    render() {

        return (<>

            {this.props.category_products && this.props.category_products.length ? this.props.category_products.map((product, index) => {

                return (<>
                    <div className="top-cat col-12" key={index}>
                        <div className="col-12 t-box cards">
                            <div className="head col-12">
                                <h4>{product?.category?.name}</h4>
                                <span>
                                    <Link href={"/search-products"}>
                                        <a>View all</a>
                                    </Link>
                                </span>
                            </div>
                            <div className="col-md-12 pb-4">
                                <div className="row">
                                    <div className="banner">
                                        <img className="lazy" src={imageOptimization(product?.category?.image,300)}
                                             data-aos="flip-right" alt={product?.category?.name} title={product?.category?.name}/>
                                    </div>

                                    <ul>
                                        {product?.category?.child && product?.category?.child.length ? product?.category?.child.map((category, index) => {
                                            return (
                                                <>
                                                  <li data-aos="flip-right" key={index}>
                                                    <span>
                                                        <img className="lazy" width="" height=""  src={imageOptimization(category.image,300)} alt={category.name} title={category.name}/>
                                                        <Link href={"/suppliers/" + product?.category?.main + "/" + product?.category?.slug + "/" + category?.slug}>
                                                          <a>
                                                              <h6>{category.name}</h6>
                                                          </a>
                                                        </Link>
                                                    </span>
                                                  </li>
                                                </>
                                            )
                                        }) : ""}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </>);

            }) : ""}
        </>)
    }
}

export default CategoryProducts;



