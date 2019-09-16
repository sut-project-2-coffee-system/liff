import React, { useState, useEffect } from 'react';
import { List, Avatar, Row, Col, Modal ,Input } from 'antd';
import { loadmenu } from './actions'
import { connect } from 'react-redux'
import 'antd/dist/antd.css';



function App(props) {

  useEffect(() => {
    props.dispatch(loadmenu())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [modal, setModal] = useState(false)
  const [amount,setAmount] = useState()
  const [remark, setRemark] = useState("")
  const [menuName, setMenuname] = useState()
  function sendMss() {
    window.liff.init(function (data) { });
    window.liff.getProfile().then(function (profile) {
      window.liff.sendMessages([
        {
          type: 'text',
          text: "สั่ง " + menuName + " " + amount + "แก้ว " +remark
        }
      ]).then(function () {
        window.liff.closeWindow();
      }).catch(function (error) {
        window.alert('Error sending message: ' + error.message);
      });
    }).catch(function (error) {
      window.alert("Error getting profile: " + error.message);
    });
    setModal(false)
  }
  function onClickList(item){
    setModal(true)
    setMenuname(item.name)
  }

  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          {console.log(props.menuList)}
          <List
            header={<div>เมนูทั้งหมด</div>}
            itemLayout="horizontal"
            dataSource={props.menuList}
            renderItem={item => (
              <List.Item>
                <span onClick={ ()=>onClickList(item) }>
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.name}
                    description={"ราคา :" + item.price}
                  /></span>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Modal
        title="กรุณาใส่ข้อมูลเพิ่มเติม"
        visible={modal}
        onOk={sendMss }
        onCancel={() => setModal(false)}
      >
        <Input size="large" placeholder="ใส่จำนวน" type="number" value={amount} onChange={(e)=> setAmount(e.target.value) }/>
        <Input size="large" placeholder="เพิ่มเติม" value={remark} onChange={(e)=> setRemark(e.target.value)}/>
      </Modal>
    </div>
  );
}

function mapStatetoProps(state) {
  return {
    menuList: state.menuList,
  }
}

export default connect(mapStatetoProps)(App)
