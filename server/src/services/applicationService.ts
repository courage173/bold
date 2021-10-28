import { InternalError, BadRequestError, NotFoundError } from '../utils/ErrorHandler';
import { Types } from 'mongoose';
import ApplicationModel, { IApplication } from '../models/applications';
import ScholarshipService from './scholarshipService';
import { JwtPayload } from '../interface/jwt-payload';

class ApplicationService {
  public static async create(payload: JwtPayload, data: IApplication): Promise<IApplication> {
    try {
      //
      if (payload.role !== 'student') {
        throw new BadRequestError('only a student can apply for a scholarship');
      }
      const scholarship = await ScholarshipService.findOneBy({
        _id: new Types.ObjectId(data.scholarshipId),
      });
      if (!scholarship) {
        throw new BadRequestError('scholarship does not exist');
      }
      const previouslyApplied = await ApplicationModel.findOne({
        scholarshipId: data.scholarshipId,
      });
      if (previouslyApplied) {
        throw new BadRequestError('you already applied');
      }
      const applicationModel = new ApplicationModel();
      applicationModel.studentId = payload.id;
      applicationModel.scholarshipId = data.scholarshipId;
      let application;
      try {
        application = await applicationModel.save();
      } catch (e) {
        throw new InternalError('An Error occurred while saving');
      }
      return application;
    } catch (error) {
      throw error;
    }
  }

  public static async findOneBy(query: any): Promise<IApplication> {
    try {
      const application = await ApplicationModel.findOne(query);
      if (!application) {
        throw new NotFoundError('application not found');
      }
      return application;
    } catch (error) {
      throw error;
    }
  }

  public static async findUserApplications(query: any): Promise<IApplication[]> {
    try {
      const applications = await ApplicationModel.find(query).populate({
        path: 'scholarshipId',
        populate: {
          path: 'sponsorId',
          model: 'User',
        },
      });
      return applications;
    } catch (error) {
      throw error;
    }
  }

  public static async findBy(query: any): Promise<IApplication[]> {
    try {
      const applications = await ApplicationModel.find(query);
      return applications;
    } catch (error) {
      throw error;
    }
  }
}

export default ApplicationService;
