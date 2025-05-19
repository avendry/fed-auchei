import { ThemeProvider } from './shared/context/ThemeProvider';
import { DashboardRoutes } from './routes/Dashboard.routes';
import { HelmetProvider } from 'react-helmet-async';
import { NotificationContainer } from './shared/components/Notification/NotificationContainer';
// import { NotificationProvider } from './shared/components/Notification/NotificationProvider';

function App() {

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme=''>
        <DashboardRoutes />
        <NotificationContainer />
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
