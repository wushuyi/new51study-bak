import {Component} from 'react';
import style from './style.scss';

export default class Button extends Component {
  render() {
    const {
      onChange,
      onBlur,
      className,
      children,
      styles,
      ...rest
    } = this.props;

    return (
      <div>
        <button
          {...rest}
          className={`button ${className || ''}`}
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
        >{children}</button>
        <style jsx>{style}</style>
      </div>
    );
  }
}