import ReactDOM from 'react-dom/client'
import MapsApp from './MapsApp.jsx'
import './index.css'
import { SocketProvider } from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <MapsApp />
  </SocketProvider>
)
