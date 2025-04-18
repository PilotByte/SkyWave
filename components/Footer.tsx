import Link from 'next/link';
import { Github } from 'lucide-react';

function CustomFooter() {
  return (
    <footer className="bg-secondary text-muted-foreground py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <nav className="flex space-x-4">
            <Link
              href="/support"
              className="text-sm hover:text-white transition-colors duration-200"
            >
              &copy; {new Date().getFullYear()} PilotByte GbR
            </Link>

            <Link
              href="/impressum"
              className="text-sm hover:text-white transition-colors duration-200"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-sm hover:text-white transition-colors duration-200"
            >
              Datenschutz
            </Link>
          </nav>
        </div>
        <div className="mt-4 text-xs text-center text-gray-400 flex items-center justify-center space-x-2">
          <p>This project is open source</p>
          <div>
            {' '}
            <a
              href="https://github.com/PilotByte/SkyWave"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="SkyWave GitHub repository"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CustomFooter;
