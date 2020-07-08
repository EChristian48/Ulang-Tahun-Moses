import * as React from 'react'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

import { Jumbotron } from './components/Jumbotron'
import { AlbumEntry, AlbumEntryProps } from './components/AlbumEntry/AlbumEntry'
import { AddButton } from './components/AddButton'
import { AddModal } from './components/AddModal/AddModal'
import { Entry } from './data/entry'

type AppState = {
  entries: AlbumEntryProps[]
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    entries: [],
  }
  componentDidMount() {
    const entriesCol = firebase.firestore().collection('entries')
    entriesCol.onSnapshot((snapshot) => {
      const newEntries: AlbumEntryProps[] = []
      snapshot.forEach((doc) => {
        const docData = doc.data() as Entry
        newEntries.push({
          id: doc.id,
          date: docData.date,
          title: docData.title,
          imageUrl: docData.imageUrl,
          imageName: docData.imageName,
        })
      })

      this.setState({
        entries: newEntries,
      })
    })
  }

  render() {
    return (
      <>
        <AddModal />
        <Jumbotron
          title='Selamat Ulang Tahun Moses'
          subtitle='🎉 Semoga sehat selalu dan panjang umur 🎉'
        />
        <div className='container'>
          {this.state.entries.map((entry) => {
            return (
              <AlbumEntry
                key={entry.id}
                id={entry.id}
                date={entry.date}
                imageUrl={entry.imageUrl}
                imageName={entry.imageName}
                title={entry.title}
              />
            )
          })}
        </div>
        <AddButton />
      </>
    )
  }
}

export { App }
