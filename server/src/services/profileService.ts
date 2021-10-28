import StudentProfile, { IStudentProfile } from '../models/student-profile';
import SponsorProfile, { ISponsorProfile } from '../models/sponsor-profile';
import UserService from './userService';
import { BadRequestError, InternalError } from '../utils/ErrorHandler';
import { JwtPayload } from '../interface/jwt-payload';

class ProfileService {
  public static async getProfile(payload: JwtPayload): Promise<IStudentProfile | ISponsorProfile> {
    try {
      //
      const user = await UserService.findOneBy({ _id: payload.id });
      let profile;
      if (user.role === 'sponsor') {
        profile = await SponsorProfile.findOne({ userId: payload.id });
      } else if (user.role === 'user') {
        profile = await StudentProfile.findOne({ userId: payload.id });
      }

      if (!profile) {
        throw new Error('user profile not found');
      }
      return profile;
    } catch (error) {
      throw error;
    }
  }
  public static async updateStudentProfile(
    payload: JwtPayload,
    data: IStudentProfile,
  ): Promise<IStudentProfile> {
    try {
      //get
      const userId = payload.id;
      //check if profile is create
      let profile = await StudentProfile.findOne({ userId: userId });
      if (!profile) {
        data.userId = userId;
        profile = await StudentProfile.create(data);
      } else {
        profile = await StudentProfile.findOneAndUpdate({ _id: profile._id }, data, { new: true });
      }
      if (!profile) {
        throw new InternalError('An Error occurred while updating');
      }
      return profile;
    } catch (error) {
      throw error;
    }
  }

  public static async updateSponsorProfile(
    payload: JwtPayload,
    data: ISponsorProfile,
  ): Promise<ISponsorProfile> {
    try {
      const userId = payload.id;

      //check if profile is create
      let profile = await SponsorProfile.findOne({ userId: userId });
      if (!profile) {
        data.userId = userId;
        profile = await SponsorProfile.create(data);
      } else {
        profile = await SponsorProfile.findOneAndUpdate({ _id: profile._id }, data, { new: true });
      }
      if (!profile) {
        throw new InternalError('An Error occurred while updating');
      }
      return profile;
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileService;
