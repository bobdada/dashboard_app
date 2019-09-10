import React from 'react'
import './Border.css'

export default function H({ children }) {
  return (
    <React.Fragment>
      {
        React.Children.map(children, (elem) => {
          if (typeof (elem) === 'string') {
            return elem
          }
          let type = elem.type;
          if (elem.type === 'p' && elem.props.transform === true) {
            type = 'h1'
          }
          return React.createElement(type, elem.props, <H>{elem.props.children}</H>)
          // let Type = type
          // return (
          //   <Type {...elem.props}>
          //     <H>
          //       {elem.props.children}
          //     </H>
          //   </Type>
          // )
        })
      }
    </React.Fragment>
  )
}
