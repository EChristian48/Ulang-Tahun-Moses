import * as React from 'react'

const AddButton: React.FC = () => {
  return (
    <div className='fixed-action-btn'>
      <a className='btn-floating green btn-large modal-trigger' href='#addModal'>
        <i className='material-icons'>add</i>
      </a>
    </div>
  )
}

export { AddButton }
