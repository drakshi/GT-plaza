import React from "react";
import Link from 'next/link';
import {connect} from "react-redux";
import {setCategories} from "../../../redux/action/categoryAction";
import API from "../../../api/api.service";
const api = new API();

class HoverCategories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    async componentDidMount() {
        if (!this.state.categories.length) {
            await api.getHomeCategories()
                .then((res) => {
                    this.props.setCategory(res.data.response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.getSupplierCategories !== this.props.getSupplierCategories) {
            this.setState({ categories : this.props?.getSupplierCategories?.get_categories?.data })
        }
    }

    render() {
        return (<>
            {this.state.categories.length ? this.state.categories.map((category, index) => {
                return (<>
                    <li className="has-children" key={index}>
                        <Link href={"/suppliers/" + category.slug}>
                            <a className="menu-trigger">
                                <img src={category.icon}/>
                                {category.name}
                            </a>
                        </Link>
                        <ul className="cd-secondary-dropdown is-hidden fade-out">
                            <li className="go-back"><a href="#0">Menu</a></li>
                            {category?.hidden_children?.length ? category.hidden_children.map((sub_category, index) => {
                                return (<>
                                    <li className="has-children" key={index}>
                                        <Link href={"/suppliers/" + category.slug + "/" + sub_category.slug}>
                                            <a>{sub_category.name}</a>
                                        </Link>
                                        <ul className="is-hidden">
                                            <li className="go-back">
                                                <a>Clothing</a>
                                            </li>
                                            {sub_category?.list_children.length ? sub_category.list_children.map((child_category, index) => {
                                                if (index < 5) {
                                                    return (<>
                                                        <li key={index}>
                                                            <Link
                                                                href={"/suppliers/" + category.slug + "/" + sub_category.slug + "/" + child_category.slug }>
                                                                <a>{child_category.name}</a>
                                                            </Link>
                                                        </li>
                                                    </>)
                                                }
                                            }) : ""}
                                            <li>
                                                <Link href={"/suppliers/" + category.slug}>
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
        </>)
    }
}


const mapStateToProps = (state) => ({
    getSupplierCategories: state.CategoryReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setCategory: (data) => dispatch(setCategories({type: "UPDATE_CATEGORIES", data: data})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HoverCategories);



