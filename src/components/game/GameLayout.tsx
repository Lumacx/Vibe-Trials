import React, { ReactNode } from 'react';

interface GameLayoutProps {
  header: ReactNode;
  gameArea: ReactNode;
  bottomSection: ReactNode;
}

const GameLayout: React.FC<GameLayoutProps> = ({ header, gameArea, bottomSection }) => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-stone-900 text-white">
      
      {/* Header Section */}
      <header
        className="flex justify-between items-center"
        style={{
          height: '15vh',
          paddingLeft: '5%',
          paddingRight: '5%',
        }}
      >
        {/* Expects: Back (left), Audio (center), Game UI (right) */}
        {header}
      </header>

      {/* Game Area Section */}
      <main
        className="flex justify-between items-center"
        style={{
          height: '70vh',
          paddingLeft: '5%',
          paddingRight: '5%',
        }}
      >
        {gameArea}
      </main>

      {/* Bottom Section */}
      <footer
        className="flex justify-between items-center"
        style={{
          height: '15vh',
          paddingLeft: '5%',
          paddingRight: '5%',
        }}
      >
        {/* Expects: Goal Text (left), Gif (center), Movement (right) */}
        {bottomSection}
      </footer>
    </div>
  );
};

export default GameLayout;
