import { InternalError, BadRequestError, NotFoundError } from '../utils/ErrorHandler';
import ScholarshipModel, { IScholarship } from '../models/scholarship';
import { JwtPayload } from '../interface/jwt-payload';
import ApplicationModel from '../models/applications';
import { IScholarshipAward } from '../interface/scholarship';

class Scholarshipervice {
  public static async create(payload: JwtPayload, data: IScholarship): Promise<IScholarship> {
    try {
      //

      const scholarshipModel = new ScholarshipModel();
      scholarshipModel.name = data.name;
      scholarshipModel.description = data.description;
      scholarshipModel.recipientNumber = data.recipientNumber;
      scholarshipModel.category = data.category;
      scholarshipModel.amount = data.amount;
      scholarshipModel.sponsorId = payload.id;

      let scholarship;
      try {
        scholarship = await scholarshipModel.save();
      } catch (e) {
        throw new InternalError('An Error occurred while saving');
      }
      return scholarship;
    } catch (error) {
      throw error;
    }
  }
  public static async findOneBy(query: any): Promise<IScholarship> {
    try {
      const scholarship = await ScholarshipModel.findOne(query);
      if (!scholarship) {
        throw new NotFoundError('scholarship not found');
      }
      return scholarship;
    } catch (error) {
      throw error;
    }
  }
  public static async findBy(
    query: any,
    skip: number = 0,
    limit: number = 20,
  ): Promise<IScholarship[]> {
    try {
      const scholarship = await ScholarshipModel.find(query).skip(skip).limit(limit);
      return scholarship;
    } catch (error) {
      throw error;
    }
  }
  public static async awardScholarship(payload: JwtPayload, data: IScholarshipAward) {
    try {
      //find scholarship
      const count = await ApplicationModel.count({
        scholarshipId: data.scholarshipId,
        awarded: true,
      });
      const scholarship = await ScholarshipModel.findOne({
        _id: data.scholarshipId,
        sponsorId: payload.id,
      });
      if (!scholarship) {
        throw new NotFoundError('scholarship not found');
      }
      if (scholarship.recipientNumber === count) {
        throw new NotFoundError('maximum number of people awarded');
      }
      let application = await ApplicationModel.findOne({
        scholarshipId: data.scholarshipId,
        studentId: data.studentId,
      });
      if (!application) {
        throw new NotFoundError('student has not applied yet');
      }
      application = await ApplicationModel.findOneAndUpdate(
        {
          scholarshipId: data.scholarshipId,
          studentId: data.studentId,
        },
        { awarded: true },
        { new: true },
      );

      return application;
      //find student and ensure the student is not currently a recipient of the sc
    } catch (error) {
      throw error;
    }
  }
}

export default Scholarshipervice;
