// Arquivo de setup para os testes com Jest.
// Pode ser usado para configurar mocks globais, limpar o banco de dados antes dos testes, etc.

// Exemplo: Mock do logger para evitar logs durante os testes
jest.mock('@/core/logging/logger', () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
}));

// Executa antes de todos os testes
beforeAll(async () => {
  // console.log('Iniciando suíte de testes...');
});

// Executa depois de todos os testes
afterAll(async () => {
  // console.log('Finalizando suíte de testes...');
});
