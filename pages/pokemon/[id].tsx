import { useRouter } from "next/router"
import { GetStaticPaths } from "next"
import { Layout } from "@/components/layouts"
import { FC } from "react"

interface Props{
  id:string;
  name:string;
}

const PokemonPage: FC<Props> = ({id, name}) => {

  const router = useRouter()

  return (
    <Layout title="Algún pokémon">
        <h1>{ id } - { name }</h1>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async(ctx) => {
  return {
    paths:[
      { params:{ id:'1' } }
    ],
    fallback:false
  }
}

export default PokemonPage