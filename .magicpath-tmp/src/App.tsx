import { Theme } from './settings/types';
import { MercuryHero } from './components/generated/MercuryHero';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <main className="w-full min-h-screen bg-white">
      <MercuryHero />
    </main>
  );
}

export default App;
