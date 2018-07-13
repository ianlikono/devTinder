import { Button, Card, Icon, Input, Modal, Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import { buttonStyles, ImageWrapper, Wrapper } from './ProfileSwipeStyles';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ModalText: 'Input Something',
      visible: false,
      confirmLoading: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <Wrapper>
        <Link to="/profile/23">
          <Button size="large" style={buttonStyles}>
            Save Info
          </Button>
        </Link>
        <Card hoverable style={{ width: 450, height: 600 }}>
          <ImageWrapper>
            <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
              <ImageUpload />
            </Card>
            <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
              <ImageUpload />
            </Card>
            <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
              <ImageUpload />
            </Card>
            <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
              <ImageUpload />
            </Card>
          </ImageWrapper>

          <h2
            style={{
              margin: 15,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            Expert:
            {' '}
            <Tag color="red">
closures
            </Tag>
            <Tag color="red">
Promises
            </Tag>
            <Tag color="red">
async
            </Tag>
            <Tag color="red">
react
            </Tag>
            <Icon type="plus-circle" style={{ color: '#fd267d' }} onClick={this.showModal} />
          </h2>
          <Modal
            title="Title"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>
              {ModalText}
              <Input placeholder="Add Topic" />
            </p>
          </Modal>
          <h2
            style={{
              margin: 15,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            Intermediate:
            {' '}
            <Tag color="blue">
Vue
            </Tag>
            <Tag color="blue">
Auth0
            </Tag>
            <Tag color="blue">
SQL
            </Tag>
            <Tag color="blue">
Mongo
            </Tag>
            <Icon type="plus-circle" style={{ color: '#fd267d' }} onClick={this.showModal} />
          </h2>
          <h2
            style={{
              margin: 15,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            Begginner:
            {' '}
            <Tag color="green">
Vue
            </Tag>
            <Tag color="green">
Auth0
            </Tag>
            <Tag color="green">
SQL
            </Tag>
            <Tag color="green">
Mongo
            </Tag>
            <Icon type="plus-circle" style={{ color: '#fd267d' }} onClick={this.showModal} />
          </h2>
        </Card>
      </Wrapper>
    );
  }
}

export default EditProfile;
