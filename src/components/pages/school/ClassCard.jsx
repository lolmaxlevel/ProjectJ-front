import {Button, Card, ConfigProvider} from 'antd';

const {Meta} = Card;

function ClassCard({title, description, link, color}) {
    const theme = {
        components: {
            Card: {
                colorBgContainer: color,
                colorBorderSecondary: color,
                colorPrimary: "#ffffff"
            },
            Button: {
                colorPrimary: "#222222",
                fontWeightStrong: 600,
                colorPrimaryHover: "rgba(34,34,34,0.65)",
                colorPrimaryActive: "rgba(34,34,34,0.88)"
            }
        },
        token: {
            fontFamily: `"Inter", sans-serif`,
            fontSize: "14px"
        }
    };

    return (
        <ConfigProvider theme={theme}>
            <Card
                style={{
                    width: 300
                }}
                hoverable={true}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
            >
                <Meta title={title} description={description}/>
                <Button
                    type="primary"
                    style={{marginTop: 30, fontWeight: "600", padding: "0 20px"}}
                    size="large"
                >
                    Read More
                </Button>
            </Card>
        </ConfigProvider>
    );
}

export default ClassCard;