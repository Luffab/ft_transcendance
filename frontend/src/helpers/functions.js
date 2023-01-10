export const get_my_token_from_document = ( my_token ) =>{
    let tokens=document.cookie.split(';')
    let token_res = ''
    tokens.map(token => {
        if (token.substring(0, my_token.length+2).trim() == my_token+'=')
            token_res = token.substring(my_token.length+2).trim()
    })
    return token_res
}