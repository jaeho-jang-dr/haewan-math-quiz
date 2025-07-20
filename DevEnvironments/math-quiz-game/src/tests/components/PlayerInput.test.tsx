import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlayerInput } from '@/components/PlayerInput'

describe('PlayerInput', () => {
  it('renders input field and button', () => {
    const mockOnAddPlayer = vi.fn()
    render(<PlayerInput onAddPlayer={mockOnAddPlayer} disabled={false} />)

    expect(screen.getByPlaceholderText('참가자 이름을 입력하세요')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '추가' })).toBeInTheDocument()
  })

  it('calls onAddPlayer when form is submitted with valid name', async () => {
    const mockOnAddPlayer = vi.fn()
    const user = userEvent.setup()
    
    render(<PlayerInput onAddPlayer={mockOnAddPlayer} disabled={false} />)

    const input = screen.getByPlaceholderText('참가자 이름을 입력하세요')
    await user.type(input, '테스트플레이어')
    await user.click(screen.getByRole('button', { name: '추가' }))

    expect(mockOnAddPlayer).toHaveBeenCalledWith('테스트플레이어')
  })

  it('clears input after successful submission', async () => {
    const mockOnAddPlayer = vi.fn()
    const user = userEvent.setup()
    
    render(<PlayerInput onAddPlayer={mockOnAddPlayer} disabled={false} />)

    const input = screen.getByPlaceholderText('참가자 이름을 입력하세요') as HTMLInputElement
    await user.type(input, '테스트플레이어')
    await user.click(screen.getByRole('button', { name: '추가' }))

    expect(input.value).toBe('')
  })

  it('does not call onAddPlayer with empty name', async () => {
    const mockOnAddPlayer = vi.fn()
    const user = userEvent.setup()
    
    render(<PlayerInput onAddPlayer={mockOnAddPlayer} disabled={false} />)

    await user.click(screen.getByRole('button', { name: '추가' }))

    expect(mockOnAddPlayer).not.toHaveBeenCalled()
  })

  it('does not call onAddPlayer with whitespace-only name', async () => {
    const mockOnAddPlayer = vi.fn()
    const user = userEvent.setup()
    
    render(<PlayerInput onAddPlayer={mockOnAddPlayer} disabled={false} />)

    const input = screen.getByPlaceholderText('참가자 이름을 입력하세요')
    await user.type(input, '   ')
    await user.click(screen.getByRole('button', { name: '추가' }))

    expect(mockOnAddPlayer).not.toHaveBeenCalled()
  })

  it('disables input and button when disabled prop is true', () => {
    const mockOnAddPlayer = vi.fn()
    render(<PlayerInput onAddPlayer={mockOnAddPlayer} disabled={true} />)

    const input = screen.getByPlaceholderText('참가자 이름을 입력하세요')
    const button = screen.getByRole('button', { name: '추가' })

    expect(input).toBeDisabled()
    expect(button).toBeDisabled()
  })

  it('applies correct styling when disabled', () => {
    const mockOnAddPlayer = vi.fn()
    render(<PlayerInput onAddPlayer={mockOnAddPlayer} disabled={true} />)

    const button = screen.getByRole('button', { name: '추가' })
    expect(button).toHaveClass('bg-gray-300', 'text-gray-500', 'cursor-not-allowed')
  })

  it('applies correct styling when enabled with text', async () => {
    const mockOnAddPlayer = vi.fn()
    const user = userEvent.setup()
    
    render(<PlayerInput onAddPlayer={mockOnAddPlayer} disabled={false} />)

    const input = screen.getByPlaceholderText('참가자 이름을 입력하세요')
    await user.type(input, '플레이어')

    const button = screen.getByRole('button', { name: '추가' })
    expect(button).toHaveClass('bg-purple-500', 'text-white')
  })

  it('handles form submission via Enter key', async () => {
    const mockOnAddPlayer = vi.fn()
    const user = userEvent.setup()
    
    render(<PlayerInput onAddPlayer={mockOnAddPlayer} disabled={false} />)

    const input = screen.getByPlaceholderText('참가자 이름을 입력하세요')
    await user.type(input, '키보드플레이어{enter}')

    expect(mockOnAddPlayer).toHaveBeenCalledWith('키보드플레이어')
  })

  it('respects maxLength attribute', () => {
    const mockOnAddPlayer = vi.fn()
    
    render(<PlayerInput onAddPlayer={mockOnAddPlayer} disabled={false} />)

    const input = screen.getByPlaceholderText('참가자 이름을 입력하세요') as HTMLInputElement
    
    expect(input).toHaveAttribute('maxLength', '10')
  })
})