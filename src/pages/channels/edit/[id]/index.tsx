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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getChannelById, updateChannelById } from 'apiSdk/channels';
import { Error } from 'components/error';
import { channelValidationSchema } from 'validationSchema/channels';
import { ChannelInterface } from 'interfaces/channel';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function ChannelEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ChannelInterface>(
    () => (id ? `/channels/${id}` : null),
    () => getChannelById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ChannelInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateChannelById(id, values);
      mutate(updated);
      resetForm();
      router.push('/channels');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ChannelInterface>({
    initialValues: data,
    validationSchema: channelValidationSchema,
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
            Edit Channel
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="budget_allocation" mb="4" isInvalid={!!formik.errors?.budget_allocation}>
              <FormLabel>Budget Allocation</FormLabel>
              <NumberInput
                name="budget_allocation"
                value={formik.values?.budget_allocation}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('budget_allocation', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.budget_allocation && (
                <FormErrorMessage>{formik.errors?.budget_allocation}</FormErrorMessage>
              )}
            </FormControl>
            <AsyncSelect<OrganizationInterface>
              formik={formik}
              name={'organization_id'}
              label={'Select Organization'}
              placeholder={'Select Organization'}
              fetcher={getOrganizations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'channel',
  operation: AccessOperationEnum.UPDATE,
})(ChannelEditPage);
