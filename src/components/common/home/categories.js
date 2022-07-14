import React from "react";
import Link from 'next/link';
import {connect} from "react-redux";
import {setCategories} from "../../../redux/action/categoryAction";
class Categories extends React.Component {

    componentDidMount() {
        this.props.setCategory(this.props.categories);
    }

    render() {
        return (<>
                <div className="category-list cat-home col-md-2 col-lg-2 col-xl-2">
                    <div className="cd-dropdown-wrapper">
                        <nav className="cd-dropdown dropdown-is-active">
                            <ul className="cd-dropdown-content" id="categories">
                                {this.props.categories && this.props.categories.length ? this.props.categories.map((category, index) => {
                                    return (<>
                                            <li className="has-children" key={index}>
                                                <Link href={"/suppliers/" + category.slug }>
                                                    <a className="menu-trigger">
                                                        <img src={category.icon}/>
                                                        {category.name}
                                                    </a>
                                                </Link>

                                                <ul className="cd-secondary-dropdown is-hidden fade-out">
                                                    <li className="go-back"><a>Menu</a></li>
                                                    { category && category.hidden_children.length ? category.hidden_children.map((sub_category, index) => {

                                                        return (<>
                                                                <li className="has-children" key={index}>
                                                                    <Link href={"/suppliers/" + category.slug + "/" + sub_category.slug } >
                                                                        <a>{sub_category.name}</a>
                                                                    </Link>

                                                                    <ul className="is-hidden">
                                                                        <li className="go-back">
                                                                            <a>Clothing</a></li>
                                                                        {sub_category && sub_category.list_children.length ? sub_category.list_children.map((child_category, index) => {
                                                                            if (index < 5) {
                                                                                return (<>
                                                                                        <li key={index}>
                                                                                            <Link href={"/suppliers/" + category.slug + "/" + sub_category.slug + "/" + child_category.slug } >
                                                                                                <a>{child_category.name}</a>
                                                                                            </Link>
                                                                                        </li>
                                                                                    </>)
                                                                            }

                                                                        }) : ""}
                                                                        <li>
                                                                            <Link href={"/suppliers/" + category.slug }>
                                                                                <a><b>See more</b></a>
                                                                            </Link>
                                                                        </li>
                                                                    </ul>

                                                                </li>
                                                            </>)
                                                    }) : " "}

                                                </ul>
                                            </li>
                                        </>)
                                }) : ""}
                            </ul>
                        </nav>
                    </div>
                </div>
            </>)
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        setCategory: (data) => dispatch(setCategories({ type: "UPDATE_CATEGORIES", data: data })),
    };
};

export default connect(null, mapDispatchToProps)(Categories);



