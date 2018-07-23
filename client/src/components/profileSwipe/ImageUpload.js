import { Button, Icon, Modal, Upload } from 'antd';
import axios from 'axios';
import gql from 'graphql-tag';
import moment from 'moment';
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { getUserPicsQuery } from '../../graphql/topics';

class ImageUpload extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    uploadButton: false,
    uploaded: false,
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };
    await axios.put(signedRequest, file, options);
  };

  formatFilename = (filename) => {
    const date = moment().format('YYYYMMDD');
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList, uploadButton: true });
  };

  PicUpload = async () => {
    const response = await this.props.s3Sign({
      variables: {
        filename: this.formatFilename(this.state.fileList[0].originFileObj.name),
        filetype: this.state.fileList[0].originFileObj.type,
      },
    });
    const { signedRequest, url } = response.data.signS3;
    await this.uploadToS3(this.state.fileList[0].originFileObj, signedRequest);
    await this.props.createPic({
      variables: {
        url,
      },
      refetchQueries: [
        {
          query: getUserPicsQuery,
          variables: { id: this.props.id },
        },
      ],
    });
    this.setState({ uploadButton: false, uploaded: true });
  }

  render() {
    // console.log(this.props);
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">
Upload
        </div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length ? null : uploadButton}
        </Upload>
        {this.state.uploadButton && (
        <Button style={{ backgroundColor: '#40c90e', color: '#fff' }} onClick={this.PicUpload}>
Upload
        </Button>
        )}
        {this.state.uploaded && (
        <h3 style={{ color: '#40c90e' }}>
UPLOADED!!!
        </h3>
        )}
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

const createPicMutation = gql`
  mutation($url: String!) {
    createPic(url: $url) {
      ok
      errors {
        path
        message
      }
      pic {
        id
        url
      }
    }
  }
`;

const s3SignMutation = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;

export default compose(
  graphql(createPicMutation, { name: 'createPic' }),
  graphql(s3SignMutation, { name: 's3Sign' }),
)(ImageUpload);
