import { Test, TestingModule } from '@nestjs/testing';
import { UserUtil } from './user-util.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../models/user.schema';
import { Movie } from '../../models/movie.schema';
import { TVShow } from '../../models/tvshow.schema';
import { AddToMyListDto } from '../dto/add-to-my-list.dto';
import { Model } from 'mongoose';

// Mock the User, Movie, and TVShow Mongoose models
const mockUserModel = {
  findById: jest.fn(),
  save: jest.fn(),
  exec: jest.fn(),
};
const mockMovieModel = {
  findById: jest.fn(),
};
const mockTVShowModel = {
  findById: jest.fn(),
};

describe('UserUtil Service', () => {
  let service: UserUtil;
  let userModel: Model<User>;
  let movieModel: Model<Movie>;
  let tvShowModel: Model<TVShow>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUtil,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(Movie.name),
          useValue: mockMovieModel,
        },
        {
          provide: getModelToken(TVShow.name),
          useValue: mockTVShowModel,
        },
      ],
    }).compile();

    service = module.get<UserUtil>(UserUtil);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    movieModel = module.get<Model<Movie>>(getModelToken(Movie.name));
    tvShowModel = module.get<Model<TVShow>>(getModelToken(TVShow.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateContentExists', () => {
    it('should throw an error if the content type is invalid', async () => {
      const contentId = 'invalid-id';
      const contentType = 'InvalidType';

      await expect(
        service.validateContentExists(contentId, contentType),
      ).rejects.toThrow('Invalid content type');
    });
  });

  describe('validateAddToListRequset', () => {
    it('should throw an error if the content already exists in the list', async () => {
      const addToMyListDto: AddToMyListDto = {
        userId: 'user-id',
        contentId: 'movie-id',
        contentType: 'Movie',
      };
      const user = {
        myList: [{ contentId: 'movie-id', contentType: 'Movie' }],
      };
      mockUserModel.findById.mockResolvedValue(user);

      await expect(
        service.validateAddToListRequset(addToMyListDto),
      ).rejects.toThrow('Item already exists in the list');
    });

    it('should throw an error if the user does not exist', async () => {
      const addToMyListDto: AddToMyListDto = {
        userId: 'user-id',
        contentId: 'movie-id',
        contentType: 'Movie',
      };
      mockUserModel.findById.mockResolvedValue(null);

      await expect(
        service.validateAddToListRequset(addToMyListDto),
      ).rejects.toThrow('User does not exists');
    });
  });

  describe('validateUserIsPresent', () => {
    it('should return true if the user exists', async () => {
      const userId = 'user-id';
      mockUserModel.findById.mockResolvedValue({ _id: userId });

      const result = await service.validateUserIsPresent(userId);

      expect(result).toBe(true);
      expect(mockUserModel.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw an error if the user does not exist', async () => {
      const userId = 'user-id';
      mockUserModel.findById.mockResolvedValue(null);

      await expect(service.validateUserIsPresent(userId)).rejects.toThrow(
        'User does not exists',
      );
    });
  });
});
