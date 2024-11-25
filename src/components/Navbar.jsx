export default function Navbar() {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between">
          <a className="text-white text-lg font-bold" href="/">Smartphone Finder</a>
          <div className="flex space-x-4">
            <a className="text-gray-300 hover:text-white" href="/">Home</a>
          </div>
        </div>
      </nav>
    );
  }
  