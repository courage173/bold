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
      scholarshipModel.expiryDate = data.expiryDate;

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
      const scholarship = await ScholarshipModel.findOne(query).populate({
        path: 'sponsorId',
        select: 'firstName lastName',
      });
      if (!scholarship) {
        throw new NotFoundError('scholarship not found');
      }
      return scholarship;
    } catch (error) {
      throw error;
    }
  }
  public static async findBy(query: any, skip: number = 0, limit: number = 20): Promise<any[]> {
    try {
      const scholarship = await ScholarshipModel.find(query)
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean();

      const result = await Promise.all(
        scholarship.map(async (scholarship) => {
          const data: any = { ...scholarship };
          const count = await ApplicationModel.count({
            scholarshipId: scholarship._id,
          });

          data.count = count;
          return data;
        }),
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
  public static async support(
    payload: JwtPayload,
    scholarshipId: string,
    amount: number,
  ): Promise<any> {
    try {
      let scholarship = await ScholarshipModel.findOne({ _id: scholarshipId });
      if (!scholarship) {
        throw new NotFoundError('scholarship not found');
      }
      const newAmount = scholarship.amount + Number(amount);
      let sponsors: any = scholarship.sponsors || [];
      let found = false;
      sponsors = sponsors.map((sponsor: any) => {
        if (sponsor.sponsorId === payload.id) {
          sponsor.amount = Number(sponsor.amount) + Number(amount);
          found = true;
        }
        return sponsor;
      });
      if (!found) {
        sponsors.push({ sponsorId: payload.id, amount });
      }
      scholarship = await ScholarshipModel.findOneAndUpdate(
        { _id: scholarshipId },
        { amount: newAmount, sponsors },
        { new: true },
      );
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
