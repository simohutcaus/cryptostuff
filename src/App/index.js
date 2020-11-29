import './App.css';
import Welcome from '../Settings/WelcomeMessage';
import styled, {css} from 'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider';
import Settings from  '../Settings'
import Content from '../Shared/Content';
import Dashboard from '../Dashboard';


function App() {
  return (
    
    <AppLayout>
      <AppProvider>
      <AppBar />
      <Content>
      <Settings />
      <Dashboard />
      </Content>
      </AppProvider>
    </AppLayout>
  );
}

export default App;
