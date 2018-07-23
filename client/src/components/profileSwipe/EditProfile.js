import { Button, Card, Icon, Modal } from 'antd';
import decode from 'jwt-decode';
import React from 'react';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import { buttonStyles, ImageWrapper, Wrapper } from './ProfileSwipeStyles';
import Topics from './Topics';
import Beginner from './topicsDisplay/Beginner';
import Expert from './topicsDisplay/Expert';
import Intermediate from './topicsDisplay/Intermediate';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ModalText: 'Select Topic',
      visibleBeg: false,
      visibleInt: false,
      visibleExp: false,
      confirmLoading: false,
      beginnerId: 1,
      intermediateId: 2,
      ExpertId: 3,
      Editable: true,
    };
  }

  userId = () => {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    return user.id;
  };


  showModalBeg = () => {
    this.setState({
      visibleBeg: true,
    });
  };

  showModalInt = () => {
    this.setState({
      visibleInt: true,
    });
  };

  showModalExp = () => {
    this.setState({
      visibleExp: true,
    });
  };

  handleOkBeg = () => {
    this.setState({
      ModalText: 'Please Wait For A Minute',
      confirmLoading: true,
    });

    setTimeout(() => {
      this.setState({
        visibleBeg: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleOkInt = () => {
    this.setState({
      ModalText: 'Please Wait For A Minute',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visibleInt: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleOkExp = () => {
    this.setState({
      ModalText: 'Please Wait For A Minute',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visibleExp: false,
        confirmLoading: false,
      });
    }, 1000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visibleExp: false,
      visibleInt: false,
      visibleBeg: false,
    });
  };

  render() {
    const {
      visibleBeg,
      visibleInt,
      visibleExp,
      confirmLoading,
      ModalText,
      beginnerId,
      intermediateId,
      ExpertId,
      Editable,
    } = this.state;
    const id = this.userId();
    const link = `/profile/${id}`;
    return (
      <Wrapper>
        <Link to={link}>
          <Button size="large" style={buttonStyles}>
            Save Info
          </Button>
        </Link>
        <Card hoverable style={{ width: 450, height: 600 }}>
          <ImageWrapper>
            <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
              <ImageUpload id={id} />
            </Card>
            <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
              <ImageUpload id={id} />
            </Card>
            <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
              <ImageUpload id={id} />
            </Card>
            <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
              <ImageUpload id={id} />
            </Card>
          </ImageWrapper>

          <h4
            style={{
              margin: 15,
              marginLeft: 0,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            Expert:
            {' '}
            <Expert Editable={Editable} ExpertId={ExpertId} />
            <Icon type="plus-circle" style={{ color: '#fd267d' }} onClick={this.showModalExp} />
          </h4>
          <Modal
            title="ADD TOPIC"
            visible={visibleExp}
            onOk={this.handleOkExp}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>
              {ModalText}
              <Topics ExpertId={ExpertId} />
            </p>
          </Modal>
          <h4
            style={{
              margin: 15,
              marginLeft: 0,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            Intermediate:
            {' '}
            <Intermediate Editable={Editable} intermediateId={intermediateId} />
            <Icon type="plus-circle" style={{ color: '#fd267d' }} onClick={this.showModalInt} />
          </h4>
          <Modal
            title="ADD TOPIC"
            visible={visibleInt}
            onOk={this.handleOkInt}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>
              {ModalText}
              <Topics intermediateId={intermediateId} />
            </p>
          </Modal>
          <h4
            style={{
              margin: 15,
              marginLeft: 0,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            Beginner
            {' '}
            <Beginner Editable={Editable} beginnerId={beginnerId} />
            <Icon type="plus-circle" style={{ color: '#fd267d' }} onClick={this.showModalBeg} />
          </h4>
          <Modal
            title="ADD TOPIC"
            visible={visibleBeg}
            onOk={this.handleOkBeg}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>
              {ModalText}
              <Topics beginnerId={beginnerId} />
            </p>
          </Modal>
        </Card>
      </Wrapper>
    );
  }
}

export default EditProfile;
