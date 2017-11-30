import Link from 'next/link'
import React from 'react';
import PropTypes from 'prop-types';
import {withRedux} from 'store'
import createLogic from 'pagelogic/indexLogic'
import logic from "../pagelogic/noop";
import {connect} from "../libs/kea";
import Head from 'next/head';

// const Fragment = props => props.children;
const Fragment = React.Fragment;


class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text}<Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    const children = this.props.messages.map((message, index) =>
      <Message key={index} text={message.text}/>
    );
    return <Fragment>{children}</Fragment>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string,
};

MessageList.prototype.getChildContext = function () {
  return {color: "purple"};
}

class Test extends React.Component {
  static contextTypes = {
    KeaContext: PropTypes.any,
  };

  render() {
    return (
      <div>test</div>
    )
  }
}

class Page extends React.Component {
  static getInitialProps(ctx) {
    const {withLogic, store} = ctx;
    // ctx.store.dispatch(ctx.withLogic.logic.actions());
    const {actions} = withLogic.logic;
    // console.log(actions.initPage('hello'));
    // console.log('run getInitialProps!');
    store.dispatch(actions.initPage('hello'));
    return {name: {sdafsad: 'sadfsadf'}}
  }

  static contextTypes = {
    store: PropTypes.any,
    KeaContext: PropTypes.any,
    mainLogic: PropTypes.any,
  };

  componentDidMount() {
    // console.log(MessageList);
  }

  render() {
    let messages = [
      {text: '12321',},
      {text: '12321',},
      {text: '12321',},
    ]
    let {title, actions} = this.props;
    return (
      <Fragment>
        <Head>
          <title>异步渲染demo</title>
        </Head>
        <div className="hello">
          {title}
        </div>
        <button onClick={()=>{
          actions.title('2233666')
        }}>2233666</button>
        {/*<Test></Test>*/}

        <MessageList messages={messages}/>

        {/*language=CSS*/}
        <style jsx>{`
          .hello {
            color: red;
          }
        `}</style>
      </Fragment>
    )
  }
}


export default withRedux(Page, function (KeaContext) {
  const {connect} = KeaContext;
  const mainLogic = createLogic(KeaContext)
  const logic = connect({
    actions: [
      mainLogic, [
        'initPage',
        'title'
      ]
    ],
    props: [
      mainLogic, ['title']
    ]
  });
  return {
    logic,
    mainLogic
  }
})