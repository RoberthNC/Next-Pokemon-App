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
            <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/94.png"
                alt="Ícono de la App"
                width={70}
                height={70}
            />

            <Text color="white" h2>P</Text>
            <Text color="white" h3>okémon</Text>

            <Spacer css={{ flex:1 }}/>

            <Text color="white">Favoritos</Text>
        </div>
    )
}