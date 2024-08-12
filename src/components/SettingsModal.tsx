import React from 'react';

interface SettingsModalProps {
  onClose: () => void;
  onDifficultyChange: (difficulty: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onDifficultyChange }) => {
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDifficultyChange(e.target.value);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">Game Settings</div>
        <div>
          <label htmlFor="difficulty">Difficulty: </label>
          <select id="difficulty" onChange={handleDifficultyChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <button className="modal-button close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
