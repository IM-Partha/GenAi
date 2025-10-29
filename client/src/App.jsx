import Header from './components/Header'
import FileUpload from './components/FileUpload'
import Summary from './components/Summary'
import Chat from './components/Chat'

import { useState } from 'react'
import Home from './components/Home'



function App() {

  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <>
        {/* <main className="container">
          <Header />
          {
            uploadedFile ?
            <>
              <Summary file={uploadedFile} />
              <Chat file={uploadedFile} />
            </>
            :
            <FileUpload setFile={setUploadedFile} />
          }
        </main> */}

        <Home/>
       
    </>
  )
}

export default App
