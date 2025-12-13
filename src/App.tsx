import React from 'react';
// Importera den nya kontrollpanelskomponenten
import ProjectDashboard from './ProjectDashboard.jsx'; 
// OBS: Om du byter namn på min fil till .tsx, byt importen ovan till './ProjectDashboard'.

/**
 * Huvudapplikationskomponenten.
 * Rensad för att enbart rendera ProjectDashboard.
 */
const App: React.FC = () => {
  return (
    // Rendra den nya kontrollpanelen
    <ProjectDashboard />
  );
};

export default App;
