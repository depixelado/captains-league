import { prop, getModelForClass } from "@typegoose/typegoose";

export class Log {
  @prop({ required: true })
  captainName!: string;

  @prop({ required: true })
  vesselName!: string;

  @prop({ required: true })
  arrivalDate!: Date;

  @prop({ required: true })
  port!: string;
}

const LogModel = getModelForClass(Log);
export default LogModel;
