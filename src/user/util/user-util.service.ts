import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from '../../models/movie.schema';
import { TVShow, TVShowDocument } from '../../models/tvshow.schema';
import { User, UserDocument } from 'src/models/user.schema';
import { AddToMyListDto } from '../dto/add-to-my-list.dto';

@Injectable()
export class UserUtil {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
    @InjectModel(TVShow.name)
    private readonly tvShowModel: Model<TVShowDocument>,
  ) {}

  /**
   * Validate if a moview exists or not
   * @param movieId
   * @returns boolean
   */
  async validatesMovieExists(movieId: string): Promise<boolean> {
    const movie = await this.movieModel.findById(movieId).exec();
    if (!movie) {
      throw new Error('Movie not found');
    }
    return true;
  }

  /**
   * Validates if a TV Show exists or not
   * @param tvShowId
   * @returns booolean
   */
  async validateTvShowExists(tvShowId: string): Promise<boolean> {
    const tvShow = await this.tvShowModel.findById(tvShowId).exec();
    if (!tvShow) {
      throw new Error('TV Show not found');
    }
    return true;
  }

  /**
   * Validates if the content type mentioned exists or not
   * @param contentId
   * @param contentType
   * @returns boolean
   */
  async validateContentExists(
    contentId: string,
    contentType: string,
  ): Promise<boolean> {
    switch (contentType) {
      case 'Movie':
        return await this.validatesMovieExists(contentId);
      case 'TVShow':
        return await this.validateTvShowExists(contentId);
      default:
        throw new Error('Invalid content type');
    }
  }

  /**
   * Checks is a list item is present in the user my list and content exista
   * @param addToMyListDto
   * @returns
   */
  async validateAddToListRequset(
    addToMyListDto: AddToMyListDto,
  ): Promise<boolean> {
    const user = await this.userModel.findById(addToMyListDto.userId);
    if (!user) {
      throw new Error('User does not exists');
    }

    const contentExists = user.myList.some(
      (item) =>
        item.contentId === addToMyListDto?.contentId &&
        item.contentType === addToMyListDto?.contentType,
    );

    if (contentExists) {
      throw new Error('Item already exists in the list');
    } else {
      return await this.validateContentExists(
        addToMyListDto.contentId,
        addToMyListDto.contentType,
      );
    }
  }

  /**
   * Validate if user exists or not
   * @param userId
   * @returns boolean
   */
  async validateUserIsPresent(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User does not exists');
    }
    return true;
  }

  /**
   * Update User's My List
   * @param addToMyList
   * @returns updated List
   */
  async updateUserList(addToMyList: AddToMyListDto) {
    const user = await this.userModel.findById(addToMyList?.userId);

    const contentId = addToMyList?.contentId;
    const contentType = addToMyList?.contentType;

    user.myList.push({
      contentId,
      contentType,
    });
    const updatedData = await user.save();

    return updatedData?.myList;
  }
}
