import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';

describe('user Service', () => {
  let service: UserService;

  const mockUser = {
    id: 1,
    email: 'test@test.com',
    name: 'John',
    roles: [0],
  };

  const mockRepository = {
    findAll: jest.fn().mockImplementation(() => Promise.resolve([])),
    findOne: jest.fn().mockImplementation(() => Promise.resolve(mockUser)),
    findOneOrFail: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser)),
    create: jest.fn().mockImplementation(() => Promise.resolve(mockUser)),
    persistAndFlush: jest.fn().mockImplementation(() => Promise.resolve()),
    flush: jest.fn().mockImplementation(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    expect(await service.findAll()).toStrictEqual([]);
  });
});
