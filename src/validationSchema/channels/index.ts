import * as yup from 'yup';
import { suggestedChangeValidationSchema } from 'validationSchema/suggested-changes';

export const channelValidationSchema = yup.object().shape({
  name: yup.string().required(),
  budget_allocation: yup.number().integer().required(),
  organization_id: yup.string().nullable().required(),
  suggested_change: yup.array().of(suggestedChangeValidationSchema),
});
