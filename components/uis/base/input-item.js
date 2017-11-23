import React from 'react';
import PropTypes from "prop-types";
import classnames from 'classnames';

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
        type: 'text',
        editable: true,
        disabled: false,
        placeholder: '',
        clear: false,
        onChange: noop,
        onBlur: noop,
        onFocus: noop,
    };

    static contextTypes = {
        antLocale: PropTypes.object,
    };

    inputRef;
    debounceTimeout;
    scrollIntoViewTimeout;

    constructor(props) {
        super(props);
        this.state = {
            placeholder: props.placeholder,
            value: props.value || props.defaultValue || '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('placeholder' in nextProps && !nextProps.updatePlaceholder) {
            this.setState({
                placeholder: nextProps.placeholder,
            });
        }
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value,
            });
        }
    }

    componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        if (this.scrollIntoViewTimeout) {
            clearTimeout(this.scrollIntoViewTimeout);
            this.scrollIntoViewTimeout = null;
        }
    }

    onInputChange = (e) => {
        let value = e.target.value;
        const {onChange, type} = this.props;

        switch (type) {
            case 'text':
                break;
            case 'bankCard':
                value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                break;
            case 'phone':
                value = value.replace(/\D/g, '').substring(0, 11);
                const valueLen = value.length;
                if (valueLen > 3 && valueLen < 8) {
                    value = `${value.substr(0, 3)} ${value.substr(3)}`;
                } else if (valueLen >= 8) {
                    value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
                }
                break;
            case 'number':
                value = value.replace(/\D/g, '');
                break;
            case 'password':
                break;
            default:
                break;
        }
        if (!('value' in this.props)) {
            this.setState({value});
        } else {
            this.setState({value: this.props.value});
        }
        if (onChange) {
            onChange(value);
        }
    };

    onInputFocus = (value) => {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        this.setState({
            focus: true,
        });
        if (document.activeElement.tagName.toLowerCase() === 'input') {
            this.scrollIntoViewTimeout = setTimeout(() => {
                try {
                    document.activeElement.scrollIntoViewIfNeeded();
                } catch (e) {
                }
            }, 100);
        }
        if (this.props.onFocus) {
            this.props.onFocus(value);
        }
    };

    onInputBlur = (value) => {
        if (this.inputRef) { // this.inputRef may be null if customKeyboard unmount
            this.debounceTimeout = setTimeout(() => {
                if (document.activeElement !== this.inputRef.inputRef) {
                    this.setState({
                        focus: false,
                    });
                }
            }, 200);
        }
        if (this.props.onBlur) {
            this.props.onBlur(value);
        }
    };

    clearInput = () => {
        if (this.props.type !== 'password' && this.props.updatePlaceholder) {
            this.setState({
                placeholder: this.props.value,
            });
        }
        this.setState({
            value: '',
        });
        if (this.props.onChange) {
            this.props.onChange('');
        }
        this.focus();
    };

    focus = () => {
        this.inputRef.focus();
    };

    render() {
        const {
            editable, style, className, type,
            clear, ...restProps,
        } = this.props;

        const {defaultValue, name, disabled, maxLength, onChange, onFocus, onBlur} = restProps;

        const {value, placeholder, focus} = this.state;

        const wrapCls = classnames(
            'input',
            className
        );

        let inputType = 'text';
        if (type === 'bankCard' || type === 'phone') {
            inputType = 'tel';
        } else if (type === 'password') {
            inputType = 'password';
        } else if (type === 'digit') {
            inputType = 'number';
        } else if (type !== 'text' && type !== 'number') {
            inputType = type;
        }

        return (
            <input
                {...restProps}
                className={wrapCls}
                value={fixControlledValue(value)}
                defaultValue={defaultValue}
                ref={el => this.inputRef = el}
                style={style}
                type={inputType}
                maxLength={maxLength}
                name={name}
                placeholder={placeholder}
                onChange={this.onInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                readOnly={!editable}
                disabled={disabled}
            />
        );
    }
}
