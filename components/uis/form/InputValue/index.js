import React from 'react';
import PropTypes from "prop-types";
import scss from './style.scss';
import classnames from 'classnames';
import Input from 'components/uis/base/input-item';

function noop() {
}

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}


export default class InputText extends React.Component {
  static defaultProps = {
    prefixCls: 'wyx-input',
    type: 'text',
    editable: true,
    disabled: false,
    placeholder: '',
    clear: false,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
  };

  inputRef;

  render() {
    const {
      prefixCls, className, ...restProps,
    } = this.props;

    const wrapCls = classnames(
      prefixCls,
      className
    );

    return (
      <div>
        <Input
          {...restProps}
          className={wrapCls}
        />
        <style jsx global>{scss}</style>
      </div>
    );
  }
}
