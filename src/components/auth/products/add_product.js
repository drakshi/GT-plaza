import React from "react";
import ProductForm from "./product_form";

class AddProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
        };
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentDidMount() {
        if (this.props.active !== "add_product") {
            this.setState({refresh: false})
        }
    }

    handleRefresh(value) {
        if (value.refresh !== this.state.refresh) {
            this.setState({
                refresh: value.refresh
            })
        }
    }

    render() {

        // this.props.handleRefreshProducts({
        //     refresh: this.state.refresh,
        //     scope : 1
        // });

        return (
            <>
                <div className={this.props.active === "add_product" ? "tab-pane active" : "tab-pane"} id="new">
                    <ProductForm handleRefresh={this.handleRefresh} type={1}/>
                </div>
            </>)
    }
}

export default AddProduct



