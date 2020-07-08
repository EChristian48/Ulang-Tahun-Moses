import * as React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { LoadingBar } from './LoadingBar'
import { Entry } from '../../data/entry'

type AddModalState = {
  title: string
  date: string
  uploadProgress: number
  [key: string]: string | number
}
class AddModal extends React.Component<{}, AddModalState> {
  fileInput = React.createRef<HTMLInputElement>()

  state: AddModalState = {
    title: '',
    date: '',
    uploadProgress: 0,
  }

  modal: M.Modal

  componentDidMount() {
    // Modal Initialization
    const addModal = document.querySelector('#addModal')
    this.modal = M.Modal.init(addModal)

    const dateInput: HTMLInputElement = document.querySelector('.datepicker')
    M.Datepicker.init(dateInput, {
      format: 'dd mmm yyyy',
      container: document.getElementById('root'),

      // Date Input Control
      onClose: () => {
        this.setState({
          [dateInput.name]: dateInput.value,
        })
      },
    })
  }

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const photo = this.fileInput.current.files[0]
    const storage = firebase.storage().ref(photo.name)
    const task = storage.put(photo)

    // Display progress bar
    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.setState({
          ...this.state,
          uploadProgress:
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        })
      },
      () => {
        // Notify the user
        this.modal.close()
        M.toast({
          html: 'Tambah foto gagal.',
        })

        // Reset State
        this.setState({
          date: '',
          title: '',
          uploadProgress: 0,
        })
        this.fileInput.current.value = null
      },
      async () => {
        const data: Entry = {
          title: this.state.title,
          date: this.state.date,
          imageUrl: await task.snapshot.ref.getDownloadURL(),
          imageName: task.snapshot.ref.name,
        }

        const entries = firebase.firestore().collection('entries')
        entries.add(data)

        // Notify the user
        this.modal.close()
        M.toast({
          html: 'Tambah foto berhasil!',
        })

        // Reset State
        this.setState({
          date: '',
          title: '',
          uploadProgress: 0,
        })
        this.fileInput.current.value = null
      }
    )
  }

  render() {
    return (
      <div id='addModal' className='modal'>
        <div className='modal-content container'>
          <h4>Tambah Foto Baru</h4>

          <form onSubmit={this.onSubmitHandler}>
            <div className='input-field'>
              <input
                type='text'
                name='title'
                id='title'
                value={this.state.title}
                onChange={this.onChangeHandler}
              />
              <label htmlFor='title'>Judul Foto</label>
            </div>

            <div className='input-field'>
              <input
                type='text'
                name='date'
                id='date'
                className='datepicker'
                value={this.state.date}
              />
              <label htmlFor='date'>Tanggal Foto</label>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label htmlFor='photo' style={{ fontSize: '11pt' }}>
                Foto:
              </label>
              <br />
              <input type='file' name='photo' id='photo' ref={this.fileInput} />
            </div>

            <button
              type='submit'
              className='btn green waves-effect waves-light'
            >
              Simpan
            </button>

            <LoadingBar progress={this.state.uploadProgress} />
          </form>
        </div>
      </div>
    )
  }
}

export { AddModal }
