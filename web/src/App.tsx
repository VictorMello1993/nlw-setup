import './styles/global.css'
import './libs/dayjs'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import { AppRoutes } from './routes/AppRoutes'

export function App() {
  return (
    <AppRoutes />
  )
}

