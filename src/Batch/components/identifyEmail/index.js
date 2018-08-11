import React, { Component } from 'react';
import { Grid, Input,Button } from '@ali/aps';
import { model, binding } from 'mota';
import Model from './model';
import { i18n } from 'common';

const Row = Grid.Row;
const Col = Grid.Col;

@model(Model)
@binding
export default class IdentifyEmail extends Component {

  componentDidMount() {
    this.model.url = this.props.url;
    this.model.init();
    this.model.query();
  }
  componentDidUpdate() {
    //将组件中的vCode传递给父组件
    const { onChange } = this.props;
    if (onChange) onChange(this.model.vCode);
  }

  render() {
    const BtnText = this.model.timerCount > 0 ?
    this.model.timerCount + 's' :
    i18n('get-verifycode');
    return <div className="batch-op-in-col">
      <Grid fluid={true}>
        <Row className='bulk-op-item'>
          <Col className='batch-lenged' md={6}><label>{i18n('batch-op-email-security-authentication')} : </label></Col>
          <Col md={18}>
            <span>{this.model.email}</span>
            <Button className="btn"
              size="small"
              type="normal"
              disabled={this.model.timerCount > 0}
              onClick={this.model.getCode} >
              {BtnText}
            </Button>
          </Col>
        </Row>
        <Row className='bulk-op-item'>
          <Col className='batch-lenged' md={6}><label>{i18n('batch-op-email-verifycode')} : </label></Col>
          <Col md={18}>
            <Input placeholder={i18n('sms-verifycode')}
              data-bind = 'vCode'
              style={{ width: '280px' }}
            />
          </Col>
        </Row>
      </Grid>
    </div >;
  }
}