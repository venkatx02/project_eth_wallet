import { Navbar, Welcome, Transactions } from './components'

const App = () => {

  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
        <Welcome />
        <Transactions />
      </div>
    </div>
  )
}

export default App
