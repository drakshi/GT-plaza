import React from "react";
import Link from "next/link";
import {images} from "../../../../constant";
import {Modal} from "react-bootstrap";

class Stories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show : false,
            video : null
        };
    }

    render() {

        return (
            <>
                {this.props.stories.length > 0 && this.props.stories.map((story, index) => {
                    return (
                        <>
                            <div id={"new-stories-"+index} key={index} className="col-md-6 p-3">
                                <div className="video-content">
                                    <div className="vid-frame" onClick={()=>{
                                        this.setState({video : story?.youtube_url},()=>{
                                            this.setState({show:true})
                                        })
                                    }}>
                                        <iframe width="100%" height="200px"
                                                src={"https://www.youtube.com/embed/" + story?.youtube_url}
                                                frameBorder="0"
                                                aria-disabled={true}
                                                allowFullScreen="">
                                        </iframe>
                                        <img className="img-fluid" src={images.vid_frame.default.src}/>
                                    </div>
                                    <div className="vid-label">
                                        <h6 className="mb-1">
                                            <Link href={story?.business_link}  rel="noreferrer">
                                                <a>
                                                    {story?.business_name}
                                                </a>
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}

                <Modal size="xl" onHide={()=>{
                    this.setState({
                        show : false
                    })
                }} show={this.state.show}>
                    <div className="modal-body video-wrapper">
                        <iframe src={"https://www.youtube.com/embed/"+this.state.video}
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen="" loading="lazy">
                        </iframe>
                    </div>
                </Modal>
            </>
        )
    }
}
export default Stories;



