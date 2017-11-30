import {Component} from 'react';
import styles from './style.scss';
import classnames from 'classnames';
import {px2rem} from "utils";
import assign from 'lodash/assign';

export default class WhiteSpace extends Component {
  static defaultProps = {
    prefixCls: 'wyx-whitespace',
    size: 'md',
  };

  render() {
    const {prefixCls, size, className, style, onClick} = this.props;
    let sizeNumber = Number(size);
    let height, porStyle;
    if (sizeNumber) {
      height = px2rem(Number(size));
    }
    const wrapCls = classnames(
      prefixCls,
      {
        [`${prefixCls}-${size}`]: !sizeNumber
      },
      className
    );

    if (height) {
      porStyle = assign({}, style, {height: height});
    }

    return (
      <div>
        <div className={wrapCls} style={porStyle || style} onClick={onClick}></div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}
