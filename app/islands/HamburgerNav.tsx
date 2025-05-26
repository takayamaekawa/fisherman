import { useState } from 'hono/jsx';
import profile from '../../data/profile.json'

const HamburgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav class="bg-gray-800 py-4 relative">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="text-gray-100 font-bold text-xl">
          <a href="/" class="text-gray-100 font-bold text-xl no-underline">
            {profile.name}
          </a>
        </div>
        <div class="md:hidden">
          <button onClick={toggleMenu} class="focus:outline-none text-grey-100">
            <svg class="w-6 h-6 fill-current text-gray-700" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
        <div class={`hidden md:flex space-x-8`}>
          <a href="/" class="text-gray-300 hover:text-blue-500">HOME</a>
          <a href="/about" class="text-gray-300 hover:text-blue-500">ABOUT</a>
          <a href="/projects" class="text-gray-300 hover:text-blue-500">PROJECTS</a>
          <a href="/services" class="text-gray-300 hover:text-blue-500">SERVICES</a>
          <a href="/contact" class="text-gray-300 hover:text-blue-500">CONTACT</a>
        </div>
        {isOpen && (
          <div class="md:hidden absolute top-full left-0 w-full bg-gray-800 shadow-md z-10">
            <div class="px-4 py-2 flex flex-col items-center space-y-2">
              <a href="/" class="text-gray-300 hover:text-blue-500">HOME</a>
              <a href="/about" class="text-gray-300 hover:text-blue-500">ABOUT</a>
              <a href="/projects" class="text-gray-300 hover:text-blue-500">PROJECTS</a>
              <a href="/services" class="text-gray-300 hover:text-blue-500">SERVICES</a>
              <a href="/contact" class="text-gray-300 hover:text-blue-500">CONTACT</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HamburgerNav;
