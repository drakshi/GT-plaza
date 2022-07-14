import React from "react";
import AuthSidebar from "../../src/components/common/afterAuth/auth_sidebar";
import ProgressBar from "./progressBar";
import {staticData} from "../../static";
import {
    LineChart,
    ResponsiveContainer,
    Tooltip,
    Legend,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import {Chart, Tooltip as Tool} from 'chart.js';
Chart.register([Tool]);
import * as ChartGeo from 'chartjs-chart-geo';
import {graph_countries} from '../../src/api/graph-countries';
import {TailSpin} from 'react-loader-spinner';
import LoadingBar from "react-top-loading-bar";
import SeoMeta from "../../src/components/common/meta/seo_meta";


class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            data: [],
            dataPointImport: [],
            dataPointImportGoods: [],
            dataPointExport: [],
            dataPointExportGoods: [],
            reporter: 826,
            partner: "all",
            year: 2020,
            commodity: "TOTAL",
            reporterValue: "United Kingdom",
            partnerValue: "World",
            yearValue: "2020",
            commodityValue: "goods",
            allData: [],
            graphYearValue: "1993",
            importKey: "",
            exportKey: "",
            tradeKeys: "",
            bilateralKey: "",
            exportbtn: true,
            isLoadingWorld: false,
            isLoadingLine: false,
            isLoadingCommodity: false,
            isLoadingCountry: false,
            showWorldGraph: false,
            showLineGraph: false,
            showCommodity: false,
            showCountry: false,
            showKeyFacts: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getWorldGraph(826, 0, 2020, 2, "TOTAL");
    }

    handleChange(e) {
        var sel = e.target.selectedIndex;
        var value = e.target.childNodes[sel];
        var option1 = value.getAttribute('data-nameReporter');
        var option2 = value.getAttribute('data-namePartner');
        var option3 = value.getAttribute('data-nameYear');
        var option4 = value.getAttribute('data-namecommodity');
        if (option1) {
            this.setState({
                reporterValue: value.getAttribute('data-nameReporter'),
            })
        }
        if (option2) {
            this.setState({
                partnerValue: value.getAttribute('data-namePartner'),
            })
        }
        if (option3) {
            this.setState({
                yearValue: value.getAttribute('data-nameYear'),
            })
        }
        if (option4) {
            this.setState({
                commodityValue: value.getAttribute('data-nameCommodity'),
            })
        }
        this.setState({
            [e.target.name]: e.target.value,
            showWorldGraph: false,
            showLineGraph: false,
            showCommodity: false,
            showCountry: false
        }, () => {
            this.getWorldGraph(this.state.reporter, this.state.partner, this.state.year, this.state.exportbtn ? "2" : "1", this.state.commodity);
        })
    }

    getWorldGraph(reporter, partner, year, type, commodity = "TOTAL") {
        this.setState({
            isLoadingWorld: true,
        }, () => {
            var url = "";
            if (type === 1) {
                url = "https://comtrade.un.org/api/get?fmt=json&max=10000&freq=A&rg=1&r=" + reporter + "&p=all&ps=" + year + "&type=C&px=HS&cc=" + commodity;
            } else {
                url = "https://comtrade.un.org/api/get?fmt=json&max=10000&freq=A&rg=2&r=" + reporter + "&p=all&ps=" + year + "&type=C&px=HS&cc=" + commodity
            }
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    if (data.dataset && data.dataset.length > 0) {

                        this.setState({showWorldGraph: true});

                        let chartStatus = Chart.getChart("canvas"); // <canvas> id
                        if (chartStatus !== undefined) {
                            chartStatus.destroy();
                        }

                        const dataPointImportValues = [];
                        const dataPointCountries = [];

                        graph_countries.length ? graph_countries.map(function (d, index) {
                            if (index !== 0) {
                                const country = data.dataset.find((item) => d.properties.name === item.ptTitle);
                                const country_ref = data.dataset.find((item) => d.properties.name === item.ptTitle
                                    || item.ptTitle.match(d.properties.name));
                                var tradeValue = country ? (country.TradeValue / 1000000000) : country_ref ? (country_ref.TradeValue / 1000000000) : 0;
                                dataPointImportValues.push({
                                    feature: d,
                                    value: tradeValue
                                });
                                dataPointCountries.push(d.properties.name);
                            }
                        }) : [];

                        fetch('https://unpkg.com/world-atlas/countries-50m.json').then((r) => r.json()).then((data) => {
                            const countries = ChartGeo.topojson.feature(data, data.objects.countries).features;
                            const chart = new Chart(document.getElementById("canvas").getContext("2d"), {
                                type: 'choropleth',
                                data: {
                                    labels: dataPointCountries,
                                    datasets: [{
                                        label: 'Countries',
                                        data: dataPointImportValues,
                                        borderWidth: 0
                                    }]
                                },
                                options: {
                                    showOutline: false,
                                    showGraticule: false,
                                    showTooltips: true,
                                    plugins: {
                                        legend: {
                                            display: false
                                        },
                                    },
                                    scales: {
                                        xy: {
                                            projection: 'equalEarth'
                                        }
                                    }
                                }
                            });
                            chart.update();
                            this.setState({
                                isLoadingWorld: false,
                            }, () => {
                                this.getKeyFacts(reporter, year, "all", commodity);
                                this.getRecordForLineGraph(reporter, partner, year, commodity);
                            })
                        });
                    } else {
                        this.setState({
                            isLoadingWorld: false,
                            showWorldGraph: false,
                            showLineGraph: true
                        }, () => {
                            this.getKeyFacts(reporter, year, "all", commodity);
                            this.getRecordForLineGraph(reporter, partner, year, commodity);
                        })
                    }
                }).catch(err => {console.log(err)})
        });
    }

    getKeyFacts(reporter, year, partner, commodity) {
        fetch("https://comtrade.un.org/api/get?fmt=json&max=2&freq=A&rg=1%2C2&r=" + reporter + "&p=" + partner + "&ps=" + year + "&type=C&px=HS&cc=" + commodity).then((res) => res.json())
            .then((data) => {
                if (data.dataset && data.dataset.length > 0) {
                    this.setState({
                        importKey: data.dataset[0].TradeValue,
                        exportKey: data.dataset[1].TradeValue,
                        tradeKeys: data.dataset[1].TradeValue > data.dataset[0].TradeValue ? Math.abs(data.dataset[1].TradeValue - data.dataset[0].TradeValue) : Math.abs(data.dataset[1].TradeValue - data.dataset[0].TradeValue),
                        bilateralKey: data.dataset[1].TradeValue + data.dataset[0].TradeValue,
                        showKeyFacts: true
                    })
                } else {
                    this.setState({showKeyFacts: false})
                }
            }).catch((err => {console.log(err)}))
    }

    getRecordForLineGraph(reporter, partner, year, commodity) {
        this.setState({
            isLoadingLine: true,
        });
        fetch(
            "https://comtrade.un.org/api/get?fmt=json&max=50000&freq=A&rg=1%2C2&r=" + reporter + "&p=" + partner + "&ps=all&type=C&px=HS&cc=TOTAL")
            .then((res) => res.json())
            .then((data) => {
                    if (data.dataset && data.dataset.length > 0) {
                        this.setState({showLineGraph: true});
                        var dataPointImportLabel = [];
                        var dataPointImportValue = [];
                        var importPoints = [];
                        const datasetImport = data.dataset.filter(v => v.rgCode === 1);
                        const arrayImportUniqueByKey = [...new Map(datasetImport.map(item =>
                            [item['period'], item])).values()];
                        var importArray = arrayImportUniqueByKey.sort(function (a, b) {
                            return b.period - a.period;
                        });
                        importArray.map(item => item.period)
                            .filter((value, index, self) => self.indexOf(value) === index)
                        importArray.length ? importArray.reverse().map(function (item, i) {
                            if (i < 30) {
                                dataPointImportLabel.push(item.period);
                                dataPointImportValue.push((item.TradeValue / 1000000000).toFixed(2))
                                importPoints.push({
                                    'label': item.period,
                                    'value': (item.TradeValue / 1000000000).toFixed(2)
                                })
                            }
                        }) : [];
                        var dataPointExportLabel = [];
                        var dataPointExportValue = [];
                        var exportPoints = [];
                        const datasetExport = data.dataset.filter(v => v.rgCode === 2);
                        const arrayExportUniqueByKey = [...new Map(datasetExport.map(item =>
                            [item['period'], item])).values()];
                        var ArrayExport = arrayExportUniqueByKey.sort(function (a, b) {
                            return b.period - a.period;
                        });

                        ArrayExport.map(item => item.period)
                            .filter((value, index, self) => self.indexOf(value) === index)
                        ArrayExport.length ? ArrayExport.reverse().map(function (item, i) {
                            if (i < 30) {
                                dataPointExportLabel.push(item.period);
                                dataPointExportValue.push((item.TradeValue / 1000000000).toFixed(2))
                                exportPoints.push({
                                    'label': item.period,
                                    'value': (item.TradeValue / 1000000000).toFixed(2)
                                })
                            }
                        }) : [];

                        const allData = [];

                        importPoints.length > 0 && importPoints.map((value, index) => {
                            allData.push({
                                label: value.label,
                                import: value.value,
                                export: exportPoints[index].value
                            })
                        });

                        this.setState({
                            allData: allData,
                            graphYearValue: allData[0].label,
                            isLoadingLine: false,
                        }, () => {
                            this.getRecordForCommodities(reporter, partner, year, commodity);
                        })
                    } else {
                        this.setState({
                            isLoadingLine: false,
                            showLineGraph: false,
                            showCommodity: true
                        }, () => {
                            this.getRecordForCommodities(reporter, partner, year, commodity);
                        })
                    }
                }).catch(err => {console.log(err)})
    }

    getRecordForCommodities(reporter, partner, year, commodity = "AG2") {
        this.setState({
            isLoadingCommodity: true
        });
        fetch(
            "https://comtrade.un.org/api/get?fmt=json&max=10000&freq=A&rg=1%2C2&r=" + reporter + "&p=" + partner + "&ps=" + year + "&type=C&px=HS&cc=" + (commodity === "TOTAL" ? "AG2" : commodity ))
            .then((res) => res.json())
            .then((data) => {
                    if (data.dataset && data.dataset.length > 0) {
                        this.setState({showCommodity: true});
                        var dataPointImport = [];
                        const dataset = data.dataset.filter(v => v.rgCode === 1);
                        var ArrayImport = dataset.sort(function (a, b) {
                            return b.TradeValue - a.TradeValue;
                        });
                        ArrayImport.length ? ArrayImport.map(function (item, i) {
                            if (i < 10) {
                                dataPointImport.push(
                                    {
                                        'label': item.cmdDescE.substring(0, 80),
                                        'y': item.TradeValue
                                    })
                            }
                        }) : [];
                        dataPointImport = [{}].concat(dataPointImport);

                        var dataPointExport = [];
                        const datasetExport = data.dataset.filter(v => v.rgCode === 2);
                        var ArrayExport = datasetExport.sort(function (a, b) {
                            return b.TradeValue - a.TradeValue;
                        });
                        ArrayExport.length ? ArrayExport.map(function (item, i) {
                            if (i < 10) {

                                dataPointExport.push({
                                    'label': item.cmdDescE.substring(0, 80),
                                    'y': item.TradeValue
                                })
                            }
                        }) : [];
                        dataPointExport = [{}].concat(dataPointExport);
                        this.setState({
                            data: data,
                            dataPointImport: dataPointImport,
                            dataPointExport: dataPointExport,
                            isLoadingCommodity: false,
                            showCountry: true
                        }, () => {
                            this.getRecordForCountry(reporter, partner, year, commodity);
                        })
                    } else {
                        this.setState({
                            isLoadingCommodity: false,
                            showCommodity: false,
                            showCountry: true
                        }, () => {
                            this.getRecordForCountry(reporter, partner, year, commodity);
                        })
                    }
                }).catch((err => {console.log(err)}))
    }

    getRecordForCountry(reporter, partner, year, commodity) {
        this.setState({
            isLoadingCountry: true
        });
        this.setState({progress: 30});
        setTimeout(() => {
            this.setState({progress: 90});
        }, 1000);

        fetch(
            "https://comtrade.un.org/api/get?fmt=json&max=50000&freq=A&rg=1%2C2&r=" + reporter + "&p=all&ps=" + year + "&type=C&px=HS&cc=" + commodity
        ).then((res) => res.json())
            .then((data) => {
                    this.setState({progress: 100});
                    if (data.dataset && data.dataset.length > 0) {
                        this.setState({showCountry: true});
                        var dataPointImportGoods = [];
                        const datasetImport = data.dataset.filter(v => v.rgCode === 1);
                        const arrayImportUniqueByKey = [...new Map(datasetImport.map(item =>
                            [item['ptTitle'], item])).values()];
                        var importArray = arrayImportUniqueByKey.sort(function (a, b) {
                            return b.TradeValue - a.TradeValue;
                        });
                        importArray.map(item => item.ptTitle)
                            .filter((value, index, self) => self.indexOf(value) === index);
                        importArray.length ? importArray.map(function (item, i) {
                            if (i < 11) {
                                dataPointImportGoods.push(
                                    {'label': item.ptTitle, 'y': item.TradeValue})
                            }
                        }) : [];

                        //EXPORT
                        var dataPointExportGoods = [];
                        const datasetExportGoods = data.dataset.filter(v => v.rgCode === 2);
                        const arrayExportUniqueByKey = [...new Map(datasetExportGoods.map(item =>
                            [item['ptTitle'], item])).values()];
                        var exportArray = arrayExportUniqueByKey.sort(function (a, b) {
                            return b.TradeValue - a.TradeValue;
                        });
                        exportArray.map(item => item.ptTitle)
                            .filter((value, index, self) => self.indexOf(value) === index)
                        exportArray.length ? exportArray.map(function (item, i) {
                            if (i < 11) {
                                dataPointExportGoods.push({'label': item.ptTitle, 'y': item.TradeValue})
                            }
                        }) : [];
                        this.setState({
                            data: data,
                            dataPointImportGoods: dataPointImportGoods,
                            dataPointExportGoods: dataPointExportGoods,
                            isLoadingCountry: false,
                        })
                    } else {
                        this.setState({isLoadingCountry: false ,showCountry: false})
                    }
                }).catch((err => {console.log(err)}))
    }


    render() {

        function MoneyFormat(num) {
            if (num > 999 && num < 1000000) {
                return (num / 1000).toPrecision(3) + 'th'; // convert to K for number from > 1000 < 1 million
            } else if (num > 1000000 && num < 1000000000) {
                return (num / 1000000).toPrecision(4) + 'm'; // convert to M for number from > 1 million
            } else if (num > 1000000000) {
                return (num / 1000000000).toFixed(1) + 'bn'; // convert to M for number from > 1 million
            } else if (num < 900) {
                return num; // if value < 1000, nothing to do
            }
        }

        return (
            <>
                <SeoMeta title={"Graphs - Global Trade Plaza"}
                         description={"Best B2B Marketplace Platform and Top 10 b2b Portal in India is Global Trade Plaza. We are Business to Business Import Export Portal helping companies, Traders and Manufacturers to find Buyers"}
                />
                <LoadingBar progress={this.state.progress} color="blue"/>
                <section className="dashboard">
                    <div className="container-fluid main-content">
                        <div className="row">
                            <AuthSidebar active={"graph"}/>
                            <div className="col-md-12 col-12 right p-gt graph-main">
                                <div className="heading main mt-2">
                                    <h3>International trade in goods</h3>
                                </div>
                                <div className="tab-pane active">
                                    <div className="col-12 t-box ps-2 pe-1 py-3">
                                        <div className="input-group mb-0">
                                            <div className="col-md-3 px-2 col-12 mb-md-0 mb-2">
                                                <input type="hidden" id="free_member" value=""/>
                                                <input type="hidden" id="graph_request" value=""/>
                                                <div className="input-group mb-0">
                                                    <div className="input-group-prepend h-100">
                                                                            <span
                                                                                className="input-group-text text-black"
                                                                                style={{fontWeight: "600"}}
                                                                                id="basic-addon1">Reporter:</span>
                                                    </div>
                                                    <select
                                                        className="filter-graph form-control js-example-reporters"
                                                        id="reporter" name="reporter"
                                                        onChange={(e) => this.handleChange(e)}>
                                                        <option value=" "  selected>{this.state.reporterValue}</option>
                                                        {
                                                            staticData.reporter.map((reporter, index) => {
                                                                return (
                                                                    <>
                                                                        <option key={index}
                                                                                value={reporter.id}
                                                                                data-nameReporter={reporter.text}>{reporter.text}
                                                                        </option>
                                                                    </>
                                                                )
                                                            })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3 px-2 col-12 mb-md-0 mb-2">
                                                <div className="input-group mb-0">
                                                    <div className="input-group-prepend">
                                                                    <span className="input-group-text text-black"
                                                                          style={{fontWeight: "600"}}
                                                                          id="basic-addon1">Partner:</span>
                                                    </div>
                                                    <select
                                                        className="filter-graph form-control js-example-partners"
                                                        id="partner" name="partner"
                                                        onChange={(e) => this.handleChange(e)}>
                                                        <option value="" selected>{this.state.partnerValue}</option>
                                                        {
                                                            staticData.partners.map((partner, index) => {
                                                                return (
                                                                    <>
                                                                        <option key={index}
                                                                                value={partner.id}
                                                                                data-namePartner={partner.text}>{partner.text}
                                                                        </option>
                                                                    </>
                                                                )
                                                            })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-2 px-2 col-12 mb-md-0 mb-2">
                                                <select
                                                    className="filter-graph form-control w-100 js-example-years"
                                                    id="year" name="year" onChange={(e) => {
                                                    this.handleChange(e)
                                                }}>
                                                    <option value=""  selected>{this.state.yearValue}</option>
                                                    {
                                                        staticData.year.map((year, index) => {
                                                            return (
                                                                <>
                                                                    <option key={index}
                                                                            value={year.text}
                                                                            data-nameYear={year.text}>{year.text}
                                                                    </option>
                                                                </>
                                                            )
                                                        })}
                                                </select>
                                            </div>
                                            <div className="col-md-4 px-2 col-12 mb-md-0 ">
                                                <select
                                                    className="filter-graph form-control w-100 js-example-codes"
                                                    id="commodity" name="commodity" onChange={(e) => {
                                                    this.handleChange(e)
                                                }}>
                                                    <option value="" disabled selected>Select
                                                    </option>
                                                    {
                                                        staticData.commodities.map((commodity, index) => {
                                                            return (
                                                                <>
                                                                    <option key={index}
                                                                            value={commodity.id}
                                                                            data-nameCommodity={commodity.text}>{commodity.text}
                                                                    </option>
                                                                </>
                                                            )
                                                        })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-2 free_search_request d-none">
                                            <small className="text-danger font-weight-bold ml-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path
                                                        d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/>
                                                </svg>
                                                Your free member search request are exhausted.
                                            </small>
                                        </div>
                                    </div>
                                    {this.state.showWorldGraph && <div id="world_graph">
                                        <div className="row">
                                            <div className="col-md-12 col-xl-12 position-relative">
                                                <div className="main-card mb-3 card">
                                                    <h5 className="mt-3 font-weight-bold text-center"><span
                                                        className="reporter_label">{this.state.reporterValue} </span>
                                                        <span
                                                            className="service"> {this.state.exportbtn ? "Export" : "Import"} </span>
                                                        of <span
                                                            className="commodity_label"> {this.state.commodityValue} </span> in
                                                        <span className="year_label">{" " + this.state.yearValue}</span>
                                                    </h5>
                                                    <div
                                                        className="btn-group btn-group-justified justify-content-center w-100"
                                                        id="flowButtons" role="group"
                                                        aria-label="Import/Balance/Export options">
                                                        <div className="btn-group mx-1" role="group">
                                                            <button type="button" id="export_country"
                                                                    className={`btn btn-sm ${this.state.exportbtn ? "btn-primary" : "btn-border"}`}
                                                                    onClick={(e) => {
                                                                        this.setState({exportbtn: true}, () => {
                                                                            this.getWorldGraph(this.state.reporter, this.state.partner, this.state.year, 2, "TOTAL")
                                                                        })
                                                                    }}
                                                                    data-value="2">
                                                                Exports
                                                            </button>
                                                        </div>
                                                        <div className="btn-group mx-1" role="group">
                                                            <button type="button" id="import_country"
                                                                    className={`btn btn-sm ${this.state.exportbtn ? "btn-border" : "btn-primary"}`}
                                                                    onClick={(e) => {
                                                                        this.setState({exportbtn: false}, () => {
                                                                            this.getWorldGraph(this.state.reporter, this.state.partner, this.state.year, 1, "TOTAL")
                                                                        })
                                                                    }}
                                                                    data-value="1">Imports
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        marginTop: "10px"
                                                    }}>
                                                        {this.state.isLoadingWorld &&
                                                        <TailSpin ariaLabel="loading-indicator" width={40}
                                                                  height={40} border="4px #ddd solid"
                                                                  color="#2e93e6"/>}

                                                    </div>
                                                    { /*this.state.isLoading && <div id="overlay" className="">
                                                                <div className="cv-spinner">
                                                                    <span className="spinner"></span>
                                                                </div>
                                                            </div>*/}

                                                    <div className="canvas">
                                                        {<canvas id="canvas"></canvas>}
                                                        <label
                                                            style={{
                                                                float: "left",
                                                                marginLeft: "5px",
                                                                fontSize: "11px"
                                                            }}>All
                                                            records in $(billion)</label>
                                                    </div>

                                                    <div className="data-canvas no-data mt-2" role="alert"
                                                         id="note_available_feature">
                                                        <div className="t-box">
                                                            <img src="../assets/images/no-data.svg"/>
                                                            <h3 className="fw-bold">Country data not available</h3>
                                                            <h6><span>Reporter country have not submitted this data , it will be updated shortly</span>
                                                            </h6>
                                                        </div>
                                                    </div>

                                                </div>
                                                {!this.state.isLoadingWorld && this.state.showKeyFacts &&
                                                <div className="canvas key-info-card d-block" style={{
                                                    position: "absolute",
                                                    bottom: "72px",
                                                    left: "30px",
                                                    background: "rgb(255,255,255)",
                                                    width: "240px",
                                                    padding: "10px",
                                                    border: "1px solid #004099",
                                                    textAlign: "left"
                                                }}>
                                                    <div id="infoBox">
                                                        <div className="panel panel-primary">
                                                            <div className="title" style={{
                                                                fontSize: "14px",
                                                                fontWeight: 600,
                                                                background: "rgb(0,64,153)",
                                                                padding: "5px",
                                                                color: "white"
                                                            }}>Key Facts
                                                            </div>
                                                            <div className="subtitle"
                                                                 style={{fontSize: "14px", margin: "8px 0"}}><strong
                                                                className="reporter_label">{this.state.reporterValue}</strong> trade
                                                                in <span
                                                                    className="commodity_label">goods</span> with <strong
                                                                    className="partner_label">{this.state.partnerValue}</strong> in <strong
                                                                    className="year_label">{this.state.yearValue}</strong><br/>
                                                            </div>
                                                            <dl>
                                                                <dt className="">Exports: <span
                                                                    className="text-muted font-weight-normal export_key">{"$" + MoneyFormat(this.state.exportKey)}</span>
                                                                </dt>
                                                                <dt className="">Imports: <span
                                                                    className="text-muted font-weight-normal import_key">{"$" + MoneyFormat(this.state.importKey)}</span>
                                                                </dt>
                                                                <dt className="">Trade balance: <span
                                                                    className="text-muted font-weight-normal trade_key">{"$" + MoneyFormat(this.state.tradeKeys)}</span>
                                                                </dt>
                                                                <dt className="">Bilateral trade: <span
                                                                    className="text-muted font-weight-normal bilateral_key">{"$" + MoneyFormat(this.state.bilateralKey)}</span>
                                                                </dt>
                                                            </dl>
                                                        </div>
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>}
                                    {this.state.showLineGraph && <div id="trade_line">
                                        <div className="row">
                                            <div className="col-md-12 col-xl-12">
                                                <div className="main-card mb-3 card">

                                                    <h5 className="mt-3 font-weight-bold text-center">
                                                        <span
                                                            className="reporter_label">{this.state.reporterValue + " "}</span>
                                                        trade in <span
                                                        className="commodity_label">goods</span> with the <span
                                                        className="partner_label">{this.state.partnerValue}</span> since {this.state.graphYearValue}
                                                    </h5>
                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        marginTop: "10px"
                                                    }}>
                                                        {/*this.state.isLoadingLine &&
                                                        <TailSpin ariaLabel="loading-indicator" width={40}
                                                                  height={40} border="4px #ddd solid"
                                                                  color="#2e93e6"/>*/}

                                                    </div>
                                                    {!this.state.isLoadingLine &&
                                                    <ResponsiveContainer width="100%" aspect={3}>
                                                        <LineChart data={this.state.allData} margin={{right: 50}}>
                                                            <CartesianGrid/>
                                                            <XAxis dataKey="label"
                                                                   interval={'preserveStartEnd'}/>
                                                            <YAxis></YAxis>
                                                            <Legend/>
                                                            <Tooltip/>
                                                            <Line dataKey="import" strokeWidth="2"
                                                                  stroke="rgba(200, 99, 132, .7)" activeDot={{r: 5}}/>
                                                            <Line dataKey="export" strokeWidth="2"
                                                                  stroke="rgba(0, 10, 130, .7)" activeDot={{r: 5}}/>
                                                        </LineChart>
                                                    </ResponsiveContainer>}


                                                    <label style={{float: "left", marginLeft: "5px", fontSize: "11px"}}>All
                                                        records in $(billion)</label>
                                                    <div className="data-line-chart no-data mt-2" role="alert"
                                                         id="note_available_feature">
                                                        <div className="t-box">
                                                            <img src="../assets/images/no-data.svg"/>
                                                            <h3 className="fw-bold">Country data not available</h3>
                                                            <h6><span>Reporter country have not submitted this data , it will be updated shortly</span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                    {this.state.showCommodity && <div id="trade_container">
                                        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                            {/*this.state.isLoadingCommodity &&
                                            <TailSpin ariaLabel="loading-indicator" width={40}
                                                      height={40} border="4px #ddd solid"
                                                      color="#2e93e6"/>*/}

                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-xl-6">
                                                <div className="main-card mb-3 card">
                                                    {/*                                <h5 class="mt-3 ml-2 font-weight-bold"><span class="reporter_label">United Kingdom</span> - Top-10 import markets for goods in <span class="year_label">2021</span></h5>*/}
                                                    <h5 className="mt-3 ml-2 font-weight-bold"><span
                                                        className="reporter_label">{this.state.reporterValue}</span> -
                                                        Top-10 imports of <span
                                                            className="commodity_label"> {this.state.commodityValue} </span>
                                                        from
                                                        <span
                                                            className="partner_label">{" "+this.state.partnerValue}</span> in <span
                                                            className="year_label">{this.state.yearValue}</span></h5>

                                                    <section className="demo-area import_trade_progress_area">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div
                                                                    className="col-lg-12 import_trade_progress">
                                                                    {this.state.dataPointImport.length > 0 ? this.state.dataPointImport.slice(1, 10).map(data => {
                                                                        return <>
                                                                            <h4 className="title" style={{
                                                                                fontSize: "10px",
                                                                                lineHeight: "20px",
                                                                                fontWeight: "600"
                                                                            }}>{data.label}</h4>
                                                                            <div style={{
                                                                                float: "right",
                                                                                marginTop: "2px",
                                                                                clear: "both",
                                                                                fontWeight: "700",
                                                                                fontSize: "10px",
                                                                                color: "#777777"
                                                                            }}>{"$" + MoneyFormat(data.y)}</div>
                                                                            <ProgressBar bgcolor="rgb(51, 255, 113)"
                                                                                         progress={data.y * 100 / this.state?.dataPointImport[1]?.y}
                                                                                         height={10}/>
                                                                        </>
                                                                    }) : <><img src="../assets/images/no-data.svg"
                                                                                style={{
                                                                                    width: "150px",
                                                                                    marginBottom: "20px"
                                                                                }}/>
                                                                        <h3 className="fw-bold">Country data not available</h3>
                                                                        <h6><span>Reporter country have not submitted this data , it will be updated shortly</span>
                                                                        </h6></>
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-xl-6">
                                                <div className="main-card mb-3 card">
                                                    {/*                          <h5 class="mt-3 ml-2 font-weight-bold"><span class="reporter_label">United Kingdom</span> - Top-10 export markets for goods in <span class="year_label">2021</span></h5>*/}
                                                    <h5 className="mt-3 ml-2 font-weight-bold"><span
                                                        className="reporter_label">{this.state.reporterValue}</span> -
                                                        Top-10 exports of <span
                                                            className="commodity_label"> {this.state.commodityValue} </span>
                                                        to <span
                                                            className="partner_label">{this.state.partnerValue}</span> in <span
                                                            className="year_label">{this.state.yearValue}</span></h5>

                                                    <section className="demo-area export_trade_progress_area">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div
                                                                    className="col-lg-12 export_trade_progress">
                                                                    {this.state.dataPointExport.length > 0 ? this.state.dataPointExport.slice(1, 10).map(data => {
                                                                        return <>
                                                                            <h4 className="title" style={{
                                                                                fontSize: "10px",
                                                                                lineHeight: "20px",
                                                                                fontWeight: "600"
                                                                            }}>{data.label}</h4>
                                                                            <div style={{
                                                                                float: "right",
                                                                                marginTop: "2px",
                                                                                clear: "both",
                                                                                fontWeight: "700",
                                                                                fontSize: "10px",
                                                                                color: "#777777"
                                                                            }}>{"$" + MoneyFormat(data.y)}</div>
                                                                            <ProgressBar bgcolor="rgb(51, 119, 255)"
                                                                                         progress={data.y * 100 / this.state?.dataPointExport[1]?.y}
                                                                                         height={10}/>
                                                                        </>
                                                                    }) : <><img src="../assets/images/no-data.svg"
                                                                                style={{
                                                                                    width: "150px",
                                                                                    marginBottom: "20px"
                                                                                }}/>
                                                                        <h3 className="fw-bold">Country data not available</h3>
                                                                        <h6><span>Reporter country have not submitted this data , it will be updated shortly</span>
                                                                        </h6></>
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                    <div
                                                        className="data_export_trade_progress_area no-data mt-2"
                                                        role="alert" id="note_available_feature">
                                                        <div className="t-box">
                                                            <img src="../assets/images/no-data.svg"/>
                                                            <h3 className="fw-bold">Country data not available</h3>
                                                            <h6><span>Reporter country have not submitted this data , it will be updated shortly</span>
                                                            </h6>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                    {this.state.showCountry && <div id="trade_countries">
                                        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                            {/*this.state.isLoadingCountry &&
                                            <TailSpin ariaLabel="loading-indicator" width={40}
                                                      height={40} border="4px #ddd solid"
                                                      color="#2e93e6"/>*/}

                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-xl-6">
                                                <div className="main-card mb-3 card">
                                                    <h5 className="mt-3 ml-2 font-weight-bold"><span
                                                        className="reporter_label">{this.state.reporterValue}</span> -
                                                        Top-10 import markets for
                                                        <span className="commodity_label"> goods </span> in <span
                                                            className="year_label">{this.state.yearValue}</span></h5>

                                                    <section className="demo-area import_progress_area">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-lg-12 import_progress">
                                                                    {this.state.dataPointImportGoods.length > 0 ? this.state.dataPointImportGoods.slice(1, 10).map(data => {
                                                                        return <>
                                                                            <h4 className="title" style={{
                                                                                fontSize: "10px",
                                                                                lineHeight: "20px",
                                                                                fontWeight: "600"
                                                                            }}>{data.label}</h4>
                                                                            <div style={{
                                                                                float: "right",
                                                                                marginTop: "2px",
                                                                                clear: "both",
                                                                                fontWeight: "700",
                                                                                fontSize: "10px",
                                                                                color: "#777777"
                                                                            }}>{"$" + MoneyFormat(data.y)}</div>
                                                                            <ProgressBar bgcolor="rgb(51, 255, 113)"
                                                                                         progress={data.y * 100 / this.state?.dataPointImportGoods[1]?.y}
                                                                                         height={10}/>
                                                                        </>
                                                                    }) : <><img src="../assets/images/no-data.svg"
                                                                                style={{
                                                                                    width: "150px",
                                                                                    marginBottom: "20px"
                                                                                }}/>
                                                                        <h3 className="fw-bold">Country data not available</h3>
                                                                        <h6><span>Reporter country have not submitted this data , it will be updated shortly</span>
                                                                        </h6></>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                    <div className="data_import_progress_area no-data mt-2"
                                                         role="alert" id="note_available_feature">
                                                        <div className="t-box">
                                                            <img src="../assets/images/no-data.svg"/>
                                                            <h3 className="fw-bold">Country data not available</h3>
                                                            <h6><span>Reporter country have not submitted this data , it will be updated shortly</span>
                                                            </h6>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-12 col-xl-6">
                                                <div className="main-card mb-3 card">
                                                    <h5 className="mt-3 ml-2 font-weight-bold"><span
                                                        className="reporter_label">{this.state.reporterValue}</span> -
                                                        Top-10 export markets for
                                                        <span className="commodity_label"> goods </span> in <span
                                                            className="year_label">{this.state.yearValue}</span></h5>

                                                    <section className="demo-area export_progress_area">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-lg-12 export_progress">
                                                                    {this.state.dataPointExportGoods.length > 0 ? this.state.dataPointExportGoods.slice(1, 10).map(data => {
                                                                            return <>
                                                                                <h4 className="title" style={{
                                                                                    fontSize: "10px",
                                                                                    lineHeight: "20px",
                                                                                    fontWeight: "600"
                                                                                }}>{data.label}</h4>
                                                                                <div style={{
                                                                                    float: "right",
                                                                                    marginTop: "2px",
                                                                                    clear: "both",
                                                                                    fontWeight: "700",
                                                                                    fontSize: "10px",
                                                                                    color: "#777777"
                                                                                }}>{"$" + MoneyFormat(data.y)}</div>
                                                                                <ProgressBar bgcolor="rgb(51, 119, 255)"
                                                                                             progress={data.y * 100 / this.state?.dataPointExportGoods[1]?.y}
                                                                                             height={10}/>
                                                                            </>
                                                                        }) :
                                                                        <><img src="../assets/images/no-data.svg"
                                                                               style={{
                                                                                   width: "150px",
                                                                                   marginBottom: "20px"
                                                                               }}/>
                                                                            <h3 className="fw-bold">Country data not available</h3>
                                                                            <h6><span>Reporter country have not submitted this data , it will be updated shortly</span>
                                                                            </h6></>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                    <div className="data_export_progress_area no-data mt-2"
                                                         role="alert" id="note_available_feature">
                                                        <div className="t-box">
                                                            <img src="../assets/images/no-data.svg"/>
                                                            <h3 className="fw-bold">Country data not available</h3>
                                                            <h6><span>Reporter country have not submitted this data , it will be updated shortly</span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Graph;



