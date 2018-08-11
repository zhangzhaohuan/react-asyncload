import React, { Component } from 'react';
import { Grid } from '@ali/aps';
import { model, binding } from 'mota';
import Model from './model';
import { i18n } from 'common';
import './index.less';
const Row = Grid.Row;
const Col = Grid.Col;

@model(Model)
@binding
export default class IdentifyApp extends Component {

  async componentDidMount() {
    await this.model.query();
    window.addEventListener('message', this.onMsg, false);
  }

  onMsg = (e) => {
    try {
      // console.log(e);
      let data = JSON.parse(e.data);
      if (data.success === true && data.ivToken) {
        this.model.ivToken = data.ivToken;
        this.props.onChange(this.model.ivToken);
      }
    } catch (error) {
      // console.log(error);
    }
  }

  render() {
    return <div className="batch-op-in-col">
      <Grid fluid={true}>
        <Row className='bulk-op-item'>
          <Col className='batch-lenged' span={6}>
            <label htmlFor="">{i18n('batch-op-one-key-authentication')} : </label>
          </Col>
          <Col span={18}>
            <iframe src={`${this.model.appAuthUrl}`} style={{ width: '400px', height: '320px' }} >
              <p>您的浏览器不支持  iframe 标签。</p>
            </iframe>
          </Col>
        </Row>
      </Grid>
    </div >;
  }
}