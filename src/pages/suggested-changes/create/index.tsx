import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSuggestedChange } from 'apiSdk/suggested-changes';
import { Error } from 'components/error';
import { suggestedChangeValidationSchema } from 'validationSchema/suggested-changes';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ChannelInterface } from 'interfaces/channel';
import { UserInterface } from 'interfaces/user';
import { getChannels } from 'apiSdk/channels';
import { getUsers } from 'apiSdk/users';
import { SuggestedChangeInterface } from 'interfaces/suggested-change';

function SuggestedChangeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SuggestedChangeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSuggestedChange(values);
      resetForm();
      router.push('/suggested-changes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SuggestedChangeInterface>({
    initialValues: {
      old_budget_allocation: 0,
      new_budget_allocation: 0,
      status: '',
      channel_id: (router.query.channel_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: suggestedChangeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Suggested Change
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="old_budget_allocation" mb="4" isInvalid={!!formik.errors?.old_budget_allocation}>
            <FormLabel>Old Budget Allocation</FormLabel>
            <NumberInput
              name="old_budget_allocation"
              value={formik.values?.old_budget_allocation}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('old_budget_allocation', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.old_budget_allocation && (
              <FormErrorMessage>{formik.errors?.old_budget_allocation}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="new_budget_allocation" mb="4" isInvalid={!!formik.errors?.new_budget_allocation}>
            <FormLabel>New Budget Allocation</FormLabel>
            <NumberInput
              name="new_budget_allocation"
              value={formik.values?.new_budget_allocation}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('new_budget_allocation', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.new_budget_allocation && (
              <FormErrorMessage>{formik.errors?.new_budget_allocation}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ChannelInterface>
            formik={formik}
            name={'channel_id'}
            label={'Select Channel'}
            placeholder={'Select Channel'}
            fetcher={getChannels}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'suggested_change',
  operation: AccessOperationEnum.CREATE,
})(SuggestedChangeCreatePage);
