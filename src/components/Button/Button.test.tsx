import { render, screen } from '@testing-library/react'; import { Button } from './Button'
it('disables a loading button and exposes busy state', () => { render(<Button loading>Save</Button>); expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled(); expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true') })
