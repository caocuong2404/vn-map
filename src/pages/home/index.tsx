import NavMenu from '@/components/common/NavMenu'
import { AppConfig } from '@/lib/AppConfig'
import { Leaf } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'

const Home = () => (
  <div className="container mx-auto max-w-2xl p-3 max-md:max-w-none">
    <Head>
      <title>VN Map - Provinces and Wards after Reform</title>
      <meta property="og:title" content="VN Map - Provinces and Wards after Reform" key="title" />
      <meta
        name="description"
        content="Search and display positions of provinces and wards after Vietnam's reform mergers."
      />
    </Head>
    <header className="items-top mt-10 gap-4 md:flex">
      <span className="text-primary">
        <Leaf size={AppConfig.ui.bigIconSize} className="mt-2" />
      </span>
      <div>
        <h2 className="text-4xl font-bold ">VN Map - Explore Reformed Vietnam</h2>
        <h3 className="mb-16 text-3xl">search provinces and wards with ease</h3>
      </div>
    </header>
    <section>
      <p className="mb-2">
        <span>An interactive map built with </span>
        <Link className="text-primary" target="_blank" href="https://nextjs.org/">
          Next.js
        </Link>
        <span> and </span>
        <Link className="text-primary" target="_blank" href="https://react-leaflet.js.org/">
          React Leaflet
        </Link>
        <span>. Written in </span>
        <Link className="text-primary" target="_blank" href="https://www.typescriptlang.org/">
          TypeScript
        </Link>
        <span> and styled with </span>
        <Link className="text-primary" target="_blank" href="https://tailwindcss.com/">
          Tailwind
        </Link>
        <span> and </span>
        <Link className="text-primary" target="_blank" href="https://lucide.dev/">
          Lucide icons
        </Link>
        <span>. ✨</span>
      </p>
      <p className="my-3">
        <span> 🤝 Feel free to contribute on </span>
        <Link href="https://github.com/caocuong2404/vn-map" className="text-primary">
          Github
        </Link>
      </p>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <h3 className="my-5 text-xl">Demo Content</h3>
        <NavMenu />
      </div>
    </section>
    <footer className="mt-16 flex justify-between rounded bg-light p-3 text-sm">
      <div>
        2023, some rights reserved <br />
        <Link href="https://github.com/caocuong2404/vn-map" className="text-primary">
          VN Map
        </Link>
      </div>
      <div className="text-primary">
        <Leaf size={AppConfig.ui.mapIconSize} className="mt-2" />
      </div>
    </footer>
  </div>
)

export default Home
