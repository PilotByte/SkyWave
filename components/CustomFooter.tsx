import Link from 'next/link';
import { Github } from 'lucide-react';

function CustomFooter() {
  return (
    <footer className="bg-secondary text-muted-foreground py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <div className="mb-4 sm:mb-0 flex items-center">
            <p className="text-sm mr-4">
              &copy; {new Date().getFullYear()} PilotByte GbR
            </p>
          </div>
          <nav className="flex space-x-4 mx-6">
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
