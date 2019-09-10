import React from 'react'

export default function D({ children }) {
  return (
    <React.Fragment>
      {
        React.Children.map(children, (elem) => {
          //console.log(children)
          if (typeof (elem) === 'string') {
            return elem
          }
          let type = elem.type;
          if (type === 'div') {
            return <React.Fragment> <D>{elem.props.children}</D> </React.Fragment>
          }
          return React.createElement(type, elem.props, <D>{elem.props.children}</D>)
        })
      }
    </React.Fragment>
  )
}