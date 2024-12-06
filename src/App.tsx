import './App.css'
import { Decoder } from './tools/Decoder'
import { Encoder } from './tools/Encoder'
import { RandomUUID } from './tools/RandomUUID'

function App() {
  
  return (
    <main className='font-sans h-screen dark:bg-gray-900 dark:text-gray-50 overflow-y-auto'>
      <div className='container mx-auto p-4 h-full'>
        <div id="explainer" className='text-justify py-8'>
          <p>
            <em>UUID Tools</em> is a set of utilities to work with UUIDs and save yourself some major headaches.
          </p>
        </div>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4'>
          <div className='space-y-4'>
            <div className='rounded shadow border border-gray-500 dark:border-gray-600 p-4'>
              <Encoder />
            </div>
          </div>
          <div className='space-y-4'>
            <div className='rounded shadow border border-gray-500 dark:border-gray-600 p-4'>
              <Decoder />
            </div>
          </div>
          <div className='space-y-4'>
            <div className='rounded shadow border border-gray-500 dark:border-gray-600 p-4'>
              <RandomUUID />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
