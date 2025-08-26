import daisyui from 'daisyui'
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'jira-blue': '#0052CC',
        'jira-blue-dark': '#0747A6',
        'jira-text': '#42526E',
        'jira-bg': '#F4F5F7',
        'jira-border': '#DFE1E6',
      }
    }
  },
  plugins: [daisyui],
}
