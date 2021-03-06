import React from 'react'
import { Avatar, Row, Col, Typography } from 'antd'
import QRCode from 'qrcode.react'
import firebase from '../Firebase'

const liff = window.liff;
const { Text, Paragraph } = Typography;


function User() {

    const [user, setUser] = React.useState({
        displayName: '',
        userId: '',
        pictureUrl: '',
        statusMessage: '',
    })
    const [point, setPoint] = React.useState(0)

    React.useEffect(() => {
        liff.init(async (data) => {
            liff.getProfile().then((profile) => {
                firebase.database().ref('member').orderByChild('userId').equalTo(profile.userId).on('value', function (snapshot) {
                    let user = snapshot.val();
                    let userPoint = 0
                    if (user !== null){
                        for (let i in user) {
                            userPoint = user[i].point
                        }
                    }
                    setUser({
                        displayName: profile.displayName,
                        userId: profile.userId,
                        pictureUrl: profile.pictureUrl,
                        statusMessage: profile.statusMessage,
                    })
                    setPoint(userPoint)
                })
            });
        });
    }, [])

    return (
        <div>
            <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col>
                    <Row type="flex" justify="center">
                        <Col>
                            <Avatar size={128} icon="user" src={user.pictureUrl} />
                        </Col>
                    </Row>
                    <Paragraph >userId: <Text type="secondary" style={{ fontSize: 10 }}>{user.userId}</Text></Paragraph>

                    <Paragraph >displayName: <Text type="secondary" style={{ fontSize: 10 }}>{user.displayName}</Text></Paragraph>

                    <Paragraph >statusMessage: <Text type="secondary" style={{ fontSize: 10 }}>{user.statusMessage}</Text></Paragraph>

                    <Paragraph >point: <Text type="secondary" style={{ fontSize: 10 }}>{point}</Text></Paragraph>

                    <Row type="flex" justify="center">
                        <Col>
                            <QRCode value={JSON.stringify(user)} size={200} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default User
