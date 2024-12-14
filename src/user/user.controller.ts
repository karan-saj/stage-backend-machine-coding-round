import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.servce';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Add a Movie or TV Show to User's list
   * @param data
   * @returns Updated List
   */
  @Post('add-to-list')
  @ApiOperation({ summary: 'Add an item to the user’s list' })
  @ApiResponse({
    status: 201,
    description: 'Item added to the list successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async addToList(
    @Body() data: { userId: string; contentId: string; contentType: string },
  ) {
    try {
      const list = await this.userService.addToList(
        data.userId,
        data.contentId,
        data.contentType,
      );
      return { list: list };
    } catch (error) {
      throw new NotFoundException('Unable to add item to list');
    }
  }

  /**
   * Remove a Movie or TV Show from User's list
   * @param userId
   * @param itemId
   * @returns Updated List
   */
  @Delete('remove-from-list/:userId/:itemId')
  @ApiOperation({ summary: 'Remove an item from the user’s list' })
  @ApiResponse({
    status: 200,
    description: 'Item removed from the list successfully.',
  })
  @ApiResponse({ status: 404, description: 'Item or user not found' })
  async removeFromList(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string,
  ) {
    try {
      const list = await this.userService.removeFromList(userId, itemId);
      return { list: list };
    } catch (error) {
      throw new NotFoundException('Unable to remove item from list');
    }
  }

  /**
   * Get List of items present in User's list
   * @param userId
   * @returns User's My List
   */
  @Get('my-items/:userId')
  @ApiOperation({ summary: 'Get the user’s list of items' })
  @ApiResponse({ status: 200, description: 'Items successfully fetched.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async listMyItems(@Param('userId') userId: string) {
    try {
      const items = await this.userService.listMyItems(userId);
      return { items };
    } catch (error) {
      throw new NotFoundException('Unable to fetch items for the user');
    }
  }

  /**
   * Get User details
   * @param userId
   * @returns
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get details of a specific user' })
  @ApiResponse({ status: 200, description: 'User successfully fetched.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async listUser(@Param('userId') userId: string) {
    try {
      const user = await this.userService.listUser(userId);
      return { user };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
