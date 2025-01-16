import AdventureGame from '../components/AdventureGame';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Choisissez Votre Aventure
        </h1>
        <AdventureGame />
      </div>
    </main>
  );
}
