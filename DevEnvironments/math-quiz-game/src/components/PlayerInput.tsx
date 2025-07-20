import React, { useState } from 'react'

interface PlayerInputProps {
  onAddPlayer: (name: string) => void
  disabled: boolean
}

export const PlayerInput: React.FC<PlayerInputProps> = ({ onAddPlayer, disabled }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAddPlayer(name)
      setName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="참가자 이름을 입력하세요"
        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none"
        maxLength={10}
        disabled={disabled}
        lang="ko"
        autoComplete="off"
        inputMode="text"
      />
      <button
        type="submit"
        disabled={disabled || !name.trim()}
        className={`px-6 py-3 rounded-xl text-lg font-bold transition-colors ${
          disabled || !name.trim()
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-purple-500 text-white hover:bg-purple-600'
        }`}
      >
        추가
      </button>
    </form>
  )
}