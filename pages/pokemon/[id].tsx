import { GetStaticPaths, GetStaticProps } from "next"
import { Layout } from "@/components/layouts"
import { FC, useState } from "react"
import { pokeAPI } from "@/api";
import { Pokemon } from "@/interfaces";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { existsInFavorites, toggleFavorite } from "@/utils";

interface Props{
  pokemon: Pokemon;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
  
  const [isInFavorites, setIsInFavorites] = useState(existsInFavorites(pokemon.id));

  const onToggleFavourite = () => {
    toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
  }

  //-- Se ejecuta en el servidor y en la web
  return (
    <Layout title={pokemon.name}>
        <Grid.Container
          css={{ marginTop:'5px' }}
          gap={ 2 }
        >
          <Grid xs={ 12 } sm={ 4 }>
            <Card
              hoverable
              css={{ padding:'30px' }}
            >
              <Card.Body>
                <Card.Image
                  src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                  alt={pokemon.name}
                  width="100%"
                  height="200px"
                />
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={ 12 } sm={ 8 }>
            <Card>
              <Card.Header
                css={{ display:'flex', justifyContent:'space-between' }}
              >
                <Text h1 transform="capitalize">{ pokemon.name }</Text>
                <Button
                  color="gradient"
                  ghost={ !isInFavorites } 
                  onClick={ onToggleFavourite }
                >
                  { isInFavorites ? 'En Favoritos':'Guardar En Favoritos' }
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container direction="row" display="flex" gap={0}>
                  <Image
                    src={ pokemon.sprites.front_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.back_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.front_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.back_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </Layout>
  )
}

//-- Solo se ejecuta del lado del servidor --
//getStaticPaths solo se ejecuta una vez en build time
export const getStaticPaths: GetStaticPaths = async(ctx) => {
  const pokemons: string[] = [...Array(152)].map((value, index) => `${index + 1}`);
  return {
    paths: pokemons.map(id => ({
      params:{ id }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeAPI.get<Pokemon>(`/pokemon/${id}`);
  return {
    props:{
      pokemon:data
    }
  }
}


export default PokemonPage