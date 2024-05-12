import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
  ) {}
  async createPlace(createPlaceInput: CreatePlaceInput, user: any) {
    const { name, description, open_hours } = createPlaceInput;

    const newPlace = this.placeRepository.create({
      name,
      description,
      open_hours,
      createdAt: new Date().toISOString(),
      user,
    });

    try {
      await this.placeRepository.save(newPlace);
      return newPlace;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllPlaces(user): Promise<Place[]> {
    const places = await this.placeRepository.find({ where: { user } });
    if (!places) {
      throw new InternalServerErrorException();
    }
    return places;
  }

  async getPlace(id: string, user: User): Promise<Place> {
    const placeFound = await this.placeRepository.findOne({
      where: { id, user },
    });
    if (!placeFound) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }
    return placeFound;
  }

  async updatePlace(updatePlaceInput: UpdatePlaceInput, user: User) {
    const place = await this.getPlace(updatePlaceInput.id, user);
    const { name, description, open_hours } = updatePlaceInput;
    if (name) {
      place.name = name;
    }
    if (description) {
      place.description = description;
    }
    if (open_hours) {
      place.open_hours = open_hours;
    }

    try {
      await this.placeRepository.save(place);
      return place;
    } catch (error) {
      console.log('Error oooo', error);
      throw new InternalServerErrorException();
    }
  }

  async deletePlace(id: string, user: User): Promise<void> {
    const place = await this.getPlace(id, user);
    try {
      await this.placeRepository.remove(place);
    } catch (error) {
      throw new Error(`Failed to delete place ${error}`);
    }
  }

  // async deletePlace(id: string, user: User) {
  //   // console.log(id, user);
  //   // console.log('delete me');
  //   const placeFound = await this.getPlace(id, user);
  //   // console.log(placeFound);
  //   // console.log(placeFound);
  //   // const removedPlaceId = placeFound.id;
  //   const result = await this.placeRepository.remove(placeFound);
  //   if (!result) {
  //     throw new NotFoundException(`Place with id ${id} not found`);
  //   }
  //   // result.id = removedPlaceId;
  //   return result;
  // }
}
