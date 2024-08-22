import GameRulesDialog from './gameRulesDialog';

export default function Header({ isStarting, playWithMariansRule }) {
  return (
    <div
      className={`flex justify-between absolute top-0 left-0 right-0 text-center m-4 text-gray-900 text-5xl font-extrabol`}
    >
      <p className={`${isStarting ? '' : 'opacity-30 text-blue-400'}`}>
        The Game{' '}
        <span className="text-sm">
          {playWithMariansRule ? "w/ Marian's Rule" : ''}
        </span>
      </p>

      <GameRulesDialog />
    </div>
  );
}
