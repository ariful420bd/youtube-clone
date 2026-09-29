import './globals.css'

export const metadata = {
  title: 'YouTube',
  description: 'Enjoy the videos and music you love'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
