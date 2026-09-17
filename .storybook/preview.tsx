import type { Preview } from '@storybook/react'
import '../src/styles/global.scss'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme', defaultValue: 'dark',
      toolbar: { items: ['light', 'dark'] },
    },
  },
  decorators: [(Story, context) => <div data-theme={context.globals.theme} style={{ minHeight: '100vh', padding: '2rem', background: 'var(--color-canvas)' }}><Story /></div>],
  parameters: { a11y: { test: 'todo' }, controls: { expanded: true } },
}
export default preview
