import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NFT',
  description: 'Buy NFT\'s',
}

export default function ProjectsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}