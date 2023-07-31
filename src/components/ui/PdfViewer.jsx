import {SpecialZoomLevel, Viewer} from '@react-pdf-viewer/core';
import {Worker} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {defaultLayoutPlugin} from "@react-pdf-viewer/default-layout";
import {Skeleton} from 'antd';


const PdfViewer = ({file}) => {
    const renderToolbar = Toolbar => (
        <Toolbar>
            {slots => {
                const {
                    Download,
                    EnterFullScreen,
                    GoToNextPage,
                    GoToPreviousPage,
                    NumberOfPages,
                    Print,
                    Zoom,
                    ZoomIn,
                    ZoomOut,
                    CurrentPageLabel,
                } = slots
                return (
                    <div
                        style={{
                            alignItems: "center",
                            display: "flex",
                            width: "100%",
                        }}
                    >
                        <div style={{padding: "0px 2px"}}>
                            <ZoomOut/>
                        </div>
                        <div style={{padding: "0px 2px"}}>
                            <Zoom/>
                        </div>
                        <div style={{padding: "0px 2px"}}>
                            <ZoomIn/>
                        </div>
                        <div style={{padding: "0px 2px", marginLeft: "auto"}}>
                            <GoToPreviousPage/>
                        </div>
                        <div style={{padding: "0px 2px"}}>
                            <CurrentPageLabel/> / <NumberOfPages/>
                        </div>
                        <div style={{padding: "0px 2px"}}>
                            <GoToNextPage/>
                        </div>
                        <div style={{padding: "0px 2px", marginLeft: "auto"}}>
                            <EnterFullScreen/>
                        </div>
                        <div style={{padding: "0px 2px"}}>
                            <Download/>
                        </div>
                        <div style={{padding: "0px 2px"}}>
                            <Print/>
                        </div>
                    </div>
                )
            }}
        </Toolbar>

    )

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: defaultTabs => [],
        renderToolbar,
    });

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    height: '500px',
                    width: '100%',
                    maxWidth: '850px',
                }}
            >
                        <Viewer
                            defaultScale={SpecialZoomLevel.ActualSize}
                            enableSmoothScroll={true}
                            fileUrl={`http://localhost:8080/files/`+file}
                            plugins={[defaultLayoutPluginInstance]}
                            renderLoader={() => <Skeleton.Button active style={{ height:"500px"}}/>}
                        />

            </div>
        </Worker>
    );
};

export default PdfViewer;
