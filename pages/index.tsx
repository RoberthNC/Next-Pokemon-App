import { FC } from "react"
import { Layout } from "@/components/layouts"
import { GetStaticProps } from "next"
import { pokeAPI } from "@/api"
import { PokemonListResponse, SmallPokemon } from "@/interfaces"
import { Grid } from '@nextui-org/react';
import { PokemonCard } from "@/components/pokemon"

interface Props{
  pokemons:SmallPokemon[];
}

const HomePage:FC<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokémons">
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeAPI.get<PokemonListResponse>('/pokemon?limit=152')
  const pokemons: SmallPokemon[] = data.results.map((pokemon, idx) => ({
    ...pokemon,
    id: idx + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx+1}.svg`
  })) 
  return {
    props:{
      pokemons
    }
  }
}

export default HomePage