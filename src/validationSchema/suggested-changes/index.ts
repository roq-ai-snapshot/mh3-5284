import * as yup from 'yup';

export const suggestedChangeValidationSchema = yup.object().shape({
  old_budget_allocation: yup.number().integer().required(),
  new_budget_allocation: yup.number().integer().required(),
  status: yup.string().required(),
  channel_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
