import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlaceService } from './place.service';
import { Place } from './entities/place.entity';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/user/get-current-user.decorator';

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Mutation(() => Place)
  async createPlace(
    @Args('createPlaceInput') createPlaceInput: CreatePlaceInput,
    @CurrentUser() user: any,
  ) {
    return this.placeService.createPlace(createPlaceInput, user);
  }

  @Query(() => [Place])
  getAllPlaces(@CurrentUser() user: User) {
    return this.placeService.getAllPlaces(user);
  }

  @Query(() => Place)
  getPlace(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.placeService.getPlace(id, user);
  }

  @Mutation(() => Place)
  async updatePlace(
    @CurrentUser() user: User,
    @Args('updatePlaceInput') updatePlaceInput: UpdatePlaceInput,
  ) {
    return this.placeService.updatePlace(updatePlaceInput, user);
  }

  @Mutation(() => Place)
  async deletePlace(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.placeService.deletePlace(id, user);
  }
}
