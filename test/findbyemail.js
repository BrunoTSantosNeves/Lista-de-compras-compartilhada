const { UsersService } = require("../src/users/users.service");

async function testFindByEmail() {
    const userService = new UsersService(); // Se necessário, passe dependências aqui
    const user = await userService.findByEmail("ze@gmail.com");
    
    console.log("Usuário encontrado no banco?", user);
}

testFindByEmail();
