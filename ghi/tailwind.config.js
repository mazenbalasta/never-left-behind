import react from '@vitejs/plugin-react-swc'
import vite from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html",
         " ./ src/**/ *.{ html, js, ts, jsx, tsx }"],
  theme: {
    extend: {},
  },
  plugins: [react(), vite()],
}

