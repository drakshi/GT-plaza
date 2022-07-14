import React from "react";
import Link from "next/link";
import LoadingBar from "react-top-loading-bar";
import {EventEmitter} from "../../../helper";

class FooterCategories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status : false,
            progress: 0
        };
    }

    componentDidMount() {
        EventEmitter.subscribe('changeProgressCategory', () => {
            this.changeProgressCategory();
        });
    }

    changeProgressCategory(){
        this.setState({
            status : true,
            progress : 100
        })
    }

    render() {
        return (
            <>
                <LoadingBar progress={this.state.progress} color="blue" />
                <ul  onClick={()=>{
                    this.setState({status : false ,progress : 30 },()=>{
                        setTimeout(
                            function() {
                                if (this.state.status !== true) {
                                    this.setState({progress: 90});
                                }
                            }.bind(this),
                            5000
                        );
                    });
                }}>
                    <li>
                        <Link href={"/suppliers/apparel-and-fashion-accessories/cosmetics-products/alcohol-based-hand-sanitizer"}>
                            <a style={{ color: "#fff" }}>Alcohol Based Hand Sanitizer</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/apparel-and-fashion-accessories/cosmetics-products/paper-soap"}>
                            <a style={{ color: "#fff" }}>Paper Soap</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/apparel-and-fashion-accessories/cosmetics-products/antibacterial-hand-wash"}>
                            <a style={{ color: "#fff" }}>Antibacterial Hand Wash</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/apparel-and-fashion-accessories/cosmetics-products/cosmetic-kits"}>
                            <a style={{ color: "#fff" }}>Cosmetic Kits</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/chemicals-allied-products/detergent-chemicals"}>
                            <a style={{ color: "#fff" }}>Detergent Chemicals</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/chemicals-allied-products/industrial-chemicals"}>
                            <a style={{ color: "#fff" }}>Industrial Chemicals</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/chemicals-allied-products/laboratory-chemicals"}>
                            <a style={{ color: "#fff" }}>Laboratory Chemicals</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/chemicals-allied-products/leather-chemicals"}>
                            <a style={{ color: "#fff" }}>Leather Chemicals</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/miscellaneous/automobile-auto-accessories/car-accessories"}>
                            <a style={{ color: "#fff" }}>Car Accessories</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/miscellaneous/automobile-auto-accessories/motorcycle-parts"}>
                            <a style={{ color: "#fff" }}>Motorcycle Parts</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/miscellaneous/automobile-auto-accessories/automobile-brakes-spare-parts"}>
                            <a style={{ color: "#fff" }}>Automobile Brakes Spare Parts</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/miscellaneous/automobile-auto-accessories/motorcycles-scooters-atv-bikes"}>
                            <a style={{ color: "#fff" }}>Motorcycle, Scooters & ATV Bikes</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/construction-real-estate/building-material-equipment/building-construction-machineries-and-equipments"}>
                            <a style={{ color: "#fff" }}>Building Construction Machineries & Equipments</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/construction-real-estate/building-material-equipment/bricks"}>
                            <a style={{ color: "#fff" }}>Bricks</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/construction-real-estate/building-material-equipment/cupboards-doors-gates-grills-windows"}>
                            <a style={{ color: "#fff" }}>Cupboards, Door, Gates, Grills & Windows</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/construction-real-estate/building-material-equipment/wall-tiles"}>
                            <a style={{ color: "#fff" }}>Wall Tiles</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/home-furnishing-supplies/household-merchandise/water-filters-water-treatment-plants"}>
                            <a style={{ color: "#fff" }}>Filters, Water Treatment Plants</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/home-furnishing-supplies/household-merchandise/household-cleaning-products"}>
                            <a style={{ color: "#fff" }}>Household Cleaning SearchProducts</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/home-furnishing-supplies/household-merchandise/wiping-rags-mops-dusters-sponge-brushes-scourer"}>
                            <a style={{ color: "#fff" }}>Wiping Rags, Mops, Dusters, Sponge, Brushes, Scourer</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/home-furnishing-supplies/household-merchandise/soaps-detergents"}>
                            <a style={{ color: "#fff" }}>Soap & Detergent</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/industrial-supplies/industrial-gears-gear-boxes"}>
                            <a style={{ color: "#fff" }}>Industrial Gears & Gear Boxes</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/industrial-supplies/machined-components"}>
                            <a style={{ color: "#fff" }}>Machined Components</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/industrial-supplies/bolts"}>
                            <a style={{ color: "#fff" }}>Bolts</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/industrial-supplies/nuts"}>
                            <a style={{ color: "#fff" }}>Nuts</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/packaging-products/food-packaging-bags"}>
                            <a style={{ color: "#fff" }}>Food Packaging Bags</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/packaging-products/wooden-packaging-boxes"}>
                            <a style={{ color: "#fff" }}>Wooden Packaging Boxes</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/packaging-products/offset-printing-machinery-equipments"}>
                            <a style={{ color: "#fff" }}>Offset Printing Machinery & Equipments</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/suppliers/industrial-goods-chemical/packaging-products/packaging-machinery"}>
                            <a style={{ color: "#fff" }}>Packaging Machinery</a>
                        </Link>
                    </li>
                </ul>
            </>
        )
    }
}
export default FooterCategories;
