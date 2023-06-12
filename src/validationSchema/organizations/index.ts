import * as yup from 'yup';
import { channelValidationSchema } from 'validationSchema/channels';

export const organizationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  channel: yup.array().of(channelValidationSchema),
});
