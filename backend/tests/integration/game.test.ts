import request from 'supertest';
import app from '@/app';
import { UserRole } from '@/modules/auth/auth.types';

describe('Game Module API', () => {
  describe('POST /api/v1/game/start', () => {
    it('deve iniciar um novo jogo e retornar um sessionId', async () => {
      const response = await request(app)
        .post('/api/v1/game/start')
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Novo jogo iniciado com sucesso!');
      expect(response.body).toHaveProperty('sessionId');
      expect(typeof response.body.sessionId).toBe('string');
    });
  });

  describe('GET /api/v1/game/config', () => {
    it('deve retornar 403 Forbidden se o usuário não for admin', async () => {
      const response = await request(app)
        .get('/api/v1/game/config')
        .set('x-user-role', UserRole.Player)
        .expect(403);
      
      expect(response.body.message).toBe('Você não tem permissão para executar esta ação.');
    });

    it('deve retornar a configuração do jogo para um usuário admin', async () => {
      const response = await request(app)
        .get('/api/v1/game/config')
        .set('x-user-role', UserRole.Admin)
        .expect(200);

      expect(response.body).toHaveProperty('minRange');
      expect(response.body).toHaveProperty('maxRange');
    });
  });

  describe('PUT /api/v1/game/config', () => {
    it('deve retornar 403 Forbidden se o usuário não for admin', async () => {
      await request(app)
        .put('/api/v1/game/config')
        .set('x-user-role', UserRole.Player)
        .send({ minRange: 10, maxRange: 50 })
        .expect(403);
    });

    it('deve retornar 400 Bad Request para dados de configuração inválidos (min >= max)', async () => {
      const response = await request(app)
        .put('/api/v1/game/config')
        .set('x-user-role', UserRole.Admin)
        .send({ minRange: 100, maxRange: 50 }) // min > max
        .expect(400);
      
      expect(response.body).toHaveProperty('message', 'Erro de validação');
      expect(response.body.errors[0].message).toBe('O valor mínimo deve ser estritamente menor que o valor máximo.');
    });

    it('deve retornar 400 Bad Request se os tipos de dados estiverem errados', async () => {
      await request(app)
        .put('/api/v1/game/config')
        .set('x-user-role', UserRole.Admin)
        .send({ minRange: 'dez', maxRange: 50 })
        .expect(400);
    });

    it('deve atualizar a configuração com sucesso para um usuário admin', async () => {
      const newConfig = { minRange: 10, maxRange: 50 };
      const response = await request(app)
        .put('/api/v1/game/config')
        .set('x-user-role', UserRole.Admin)
        .send(newConfig)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Configuração atualizada com sucesso!');
      expect(response.body.config).toEqual(newConfig);

      // Verifica se a configuração foi realmente atualizada
      const getConfigResponse = await request(app)
        .get('/api/v1/game/config')
        .set('x-user-role', UserRole.Admin)
        .expect(200);
      
      expect(getConfigResponse.body).toEqual(newConfig);
    });
  });
});
