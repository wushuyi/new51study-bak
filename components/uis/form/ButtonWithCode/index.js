import {Component} from 'react';
import style from './style.scss';
import Button from 'components/uis/form/Button';
import InputText from 'components/uis/form/InputText';

export default class Button extends Component {
  render() {
    const {
      onChange,
      onBlur,
      className,
      children,
      ...rest
    } = this.props;

    return (
      <div>
        <InputText/>
        <Button/>
        <style jsx>{style}</style>
      </div>
    );
  }
}