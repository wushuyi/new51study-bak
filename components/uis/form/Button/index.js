import {Component} from 'react';
import style from './style.scss';
import classnames from 'classnames';

export default class Button extends Component {
  static defaultProps = {
    prefixCls: 'wyx-auth-button',
  };

  render() {
    const {
      prefixCls,
      className,

      onChange,
      onBlur,

      children,
      styles,
      ...rest
    } = this.props;

    const wrapCls = classnames(
      prefixCls,
      'button',
      className
    );

    return (
      <button
        {...rest}
        className={wrapCls}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value, e);
          }
        }}
        onBlur={(e) => {
          if (onBlur) {
            onBlur(e);
          }
        }}
      >{children}
        <style jsx global>{style}</style>
      </button>
    );
  }
}
