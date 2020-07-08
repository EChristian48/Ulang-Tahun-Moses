import * as React from 'react'

type JumbotronProps = {
  title: string
  subtitle: string
}

const Jumbotron: React.FC<JumbotronProps> = (props) => {
  return (
    <div className='jumbotron'>
      <h1 className='hide-on-small-only'>{props.title}</h1>
      <h3 className='hide-on-med-and-up'>{props.title}</h3>
      <p className='flow-text'>{props.subtitle}</p>
    </div>
  )
}

export { Jumbotron }
