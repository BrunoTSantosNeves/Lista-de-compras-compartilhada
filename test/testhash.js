const bcrypt = require('bcrypt');

const senhaOriginal = "2222"; // Senha em texto puro
const senhaHash = "$2b$10$AS3y2ekrtuBDRWnDm7QEleqLuXPMEy8uJCHzX7iUujo6ey7.kUwFm"; // Substitua pelo hash salvo no banco

async function testarSenha() {
    const hashGerado = await bcrypt.hash(senhaOriginal, 10);
    console.log("Hash gerado para a senha:", hashGerado);

    const match = await bcrypt.compare(senhaOriginal, senhaHash);
    console.log("A senha inserida corresponde ao hash salvo?", match);
}

testarSenha();
