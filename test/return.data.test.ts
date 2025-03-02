import { DataSource } from 'typeorm';
import { ListaCompras } from '../src/modules/auth/list/list.buy.entity';
import { User } from '../src/modules/users/users.entity';

describe('ListaCompras Repository', () => {
  let testDataSource: DataSource;

  beforeAll(async () => {
    testDataSource = new DataSource({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'database_test',
      // Importa as entidades envolvidas (relacionamentos) para que o TypeORM possa reconhecê-las
      entities: [ListaCompras, User],
      synchronize: true, // Use synchronize somente em ambiente de testes!
    });
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  it('should return ListaCompras data correctly', async () => {
    const listaRepository = testDataSource.getRepository(ListaCompras);
    const userRepository = testDataSource.getRepository(User);

    // Inserindo um usuário para servir de criador na lista
    const user = userRepository.create({
      nome: 'Test User',
      email: 'test@example.com',
      senha: '123456',
      data_criacao: new Date(),
    });
    const savedUser = await userRepository.save(user);

    // Inserindo uma lista de compras
    const testLista = listaRepository.create({
      nome: 'Lista de Teste',
      criador: savedUser,
      data_criacao: new Date(),
      data_atualizacao: new Date(),
    });
    await listaRepository.save(testLista);

    // Buscando as listas com o relacionamento 'criador' carregado
    const lists = await listaRepository.find({ relations: ['criador'] });

    // Verifica se encontramos algum registro
    expect(Array.isArray(lists)).toBe(true);
    expect(lists.length).toBeGreaterThan(0);

    const insertedList = lists.find(list => list.nome === 'Lista de Teste');
    expect(insertedList).toBeDefined();
    if (insertedList) {
      expect(insertedList).toHaveProperty('criador');
      expect(insertedList.criador.id).toEqual(savedUser.id);
    }
  });
});