import * as React from 'react'


import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

type AlbumEntryProps = {
  title: string
  date: string
  imageUrl: string
  imageName: string
  id: string
}

const AlbumEntry: React.FC<AlbumEntryProps> = (props) => {
  const entries = firebase.firestore().collection('entries')
  const image = firebase.storage().ref(props.imageName)

  const editEntry = (id: string) => {
    
  }

  const deleteEntry = (id: string) => {
    entries.doc(id).delete()
    image.delete()
  }

  return (
    <div className='row center-align'>
      <div className='col s12 m6 full-height'>
        <div className='text-center'>
          <h3 className='image-title'>{props.title}</h3>
        </div>
      </div>
      <div className='col s12 m6'>
        <div className='card'>
          <div className='card-image'>
            <img className='img-fluid' src={props.imageUrl} alt='' />
            <span className='card-title'>{props.date}</span>
            <button
              className='btn-floating red halfway-fab waves-effect waves-light'
              id={`delete_${props.id}`}
              onClick={() => deleteEntry(props.id)}
            >
              <i className='material-icons'>delete</i>
            </button>
            <button
              className='btn-floating light-blue halfway-fab waves-effect waves-light'
              id={`edit_${props.id}`}
              style={{ right: '70px' }}
              onClick={() => editEntry(props.id)}
            >
              <i className='material-icons'>create</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AlbumEntry, AlbumEntryProps }
