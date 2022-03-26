import Head from 'next/head'
import Image from 'next/image'

import Header from '../components/Header'
import Card from '../components/Card'

const style = {
  wrapper: `h-full w-full flex flex-col bg-[#222229]`,
  cardsContainer: `flex flex-col items-center justify-center flex-1 mt-5`,
}

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.wrapper}>
        <Header />
        <div className={style.cardsContainer}>
          <Card />
        </div>
      </div>
    </div>
  )
}

export default Home
