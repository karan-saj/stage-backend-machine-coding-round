import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.schema';
import { AddToMyList } from './dto/add-to-my-list.dto';
import { UserUtil } from './util/user-util.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly userUtil: UserUtil,
  ) {}

  /**
   * Add TV Show or Moview to Use's My List
   * @param addToMyListDto AddToMyList
   * @returns
   */
  async addToList(addToMyListDto: AddToMyList) {
    try {
      await this.userUtil.validateAddToListRequset(addToMyListDto);

      return await this.userUtil.updateUserList(addToMyListDto);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add item to list: ' + error.message);
    }
  }

  /**
   * Remove TV Show or Movie from User's My List
   * @param userId
   * @param contentId
   * @returns Updated List
   */
  async removeFromList(userId: string, contentId: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const contentIndex = user.myList.findIndex(
        (item) => item.contentId === contentId,
      );
      if (contentIndex === -1) {
        throw new Error('Item not found in the list');
      }

      // Remove item from the list
      user.myList.splice(contentIndex, 1);
      const updatedData = await user.save();

      return updatedData?.myList;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to remove item from list' + error.message);
    }
  }

  /**
   * Fetch User's My List
   * @param userId
   * @returns Return items in User's My List
   */
  async listMyItems(userId: string) {
    try {
      const user = await this.userModel
        .findById(userId)
        .select('myList')
        .exec();
      if (!user) {
        throw new Error('User not found');
      }

      return user.myList;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to list items' + error.message);
    }
  }

  /**
   * Fetch User Details
   * @param userId
   * @returns User Details
   */
  async listUser(userId: string) {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new Error('User not found');
      }

      return {
        username: user.username,
        favoriteGenres: user.favoriteGenres,
        dislikedGenres: user.dislikedGenres,
        myList: user.myList,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user details' + error.message);
    }
  }

  // TODO: DONT PUSH
  async listUsers() {
    try {
      const users = await this.userModel.find().exec();

      if (!users || users.length === 0) {
        throw new Error('No users found');
      }

      // Map over the users and return relevant details
      return { users: users };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user details');
    }
  }
}
