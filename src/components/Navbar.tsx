import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BrainCircuit } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 z-50 flex w-[90%] max-w-5xl -translate-x-1/2 items-center justify-between rounded-2xl bg-white/80 px-6 py-3 shadow-lg backdrop-blur-xl">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
          <BrainCircuit className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-semibold">RoundAce</span>
      </Link>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <Link to="/signin">
          <Button className="rounded-lg bg-black px-5 text-white hover:bg-black/90">
            Log In
          </Button>
        </Link>
      </div>
    </nav>
  );
}
