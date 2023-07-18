const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const login = require('./login');

// Мокові дані для тестування
const mockUser = {
  _id: 'user_id',
  email: 'test@example.com',
  password: 'testpassword',
  subscription: 'basic',
};

// Mock-функція для методу User.findOne
jest.mock('../../models/user.js', () => ({
  User: {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

// Mock-функції для залежних бібліотек
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mockToken'),
}));
jest.mock('bcrypt', () => ({
  compare: jest.fn(() => true),
}));

// Mock-функція для HttpError
jest.mock('../../helpers', () => ({
  HttpError: jest.fn((statusCode, message) => ({
    statusCode,
    message,
  })),
}));

describe('Login Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: mockUser.email,
        password: mockUser.password,
      },
    };
    res = {
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with status code 200', async () => {
    User.findOne.mockResolvedValue(mockUser);

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'mockToken',
        user: { email: 'test@example.com', subscription: 'basic' },
      })
    );
  });

  it('should return a token in the response', async () => {
    User.findOne.mockResolvedValue(mockUser);

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'mockToken',
      })
    );
  });

  it('should return a user object with email and subscription fields as strings in the response', async () => {
    User.findOne.mockResolvedValue(mockUser);

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
        }),
      })
    );
  });

  it('should throw an HttpError with status code 401 if user is not found', async () => {
    User.findOne.mockResolvedValue(null);

    await expect(login(req, res)).rejects.toEqual(
      expect.objectContaining({
        statusCode: 401,
        message: 'Email or password is wrong',
      })
    );
  });

  it('should throw an HttpError with status code 401 if password is incorrect', async () => {
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await expect(login(req, res)).rejects.toEqual(
      expect.objectContaining({
        statusCode: 401,
        message: 'Email or password is wrong',
      })
    );
  });
});
