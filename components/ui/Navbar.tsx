import NextLink from 'next/link'
import { Image, Spacer, Text, useTheme } from "@nextui-org/react"

export const Navbar = () => {
  
    const { theme } = useTheme()

    return (
        <div style={{
            display:'flex',
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'start',
            padding:'0px 20px',
            backgroundColor:theme?.colors.gray900.value
        }}>
            <NextLink href="/" passHref>
                <div style={{
                    display:'flex',
                    alignItems:'center'
                }}>
                    <Image
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/94.png"
                        alt="Ícono de la App"
                        width={70}
                        height={70}
                    />
                    <Text color="white" h2>P</Text>
                    <Text color="white" h3>okémon</Text>
                </div>
            </NextLink>


            <Spacer css={{ flex:1 }}/>

            <NextLink href="/favorites" passHref>
                <Text color="white">Favoritos</Text>
            </NextLink>
        </div>
    )
}