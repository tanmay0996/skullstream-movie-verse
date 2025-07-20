// src/components/SearchBar.tsx
import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-2">
      <input
        type="text"
        placeholder="Search movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-4 py-2 rounded bg-white/10 text-white placeholder-white/50 outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
