import { Facebook, Github, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold text-red-600">StreamHub</h3>
            <p className="mt-4 text-gray-400">
              Your ultimate destination for movies, TV shows, and anime streaming.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/movies" className="text-gray-400 hover:text-white">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/series" className="text-gray-400 hover:text-white">
                  TV Series
                </Link>
              </li>
              <li>
                <Link to="/anime" className="text-gray-400 hover:text-white">
                  Anime
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Categories</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Comedy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Drama
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Horror
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} StreamHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}