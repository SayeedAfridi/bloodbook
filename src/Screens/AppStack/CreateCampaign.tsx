import { TextInput } from '@src/components'
import { AppNavigationProps } from '@src/navigtation/types'
import {
  getErrorMessage,
  showErrorSnackbar,
  showSuccessSnackbar,
} from '@src/utils'
import { useFormik } from 'formik'
import React from 'react'
import AuthLayout from '../Authentication/AuthLayout'
import * as yup from 'yup'
import { firestoreService } from '@src/services'
import { campaignsCollection } from '@src/constants/collections'
import { useSelector } from 'react-redux'
import { selectUser } from '@src/redux/auth/auth.selectors'
import dayjs from 'dayjs'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  location: yup.string().required('Locatin is required'),
  image: yup.string().required('Image is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
})

const CreateCampaign: React.FC<AppNavigationProps<'CreateCampaign'>> = ({
  navigation,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const user = useSelector(selectUser)

  const onSubmit = async (v: any) => {
    try {
      setLoading(true)
      const data = {
        ...v,
        startDate: dayjs(v.startDate).toISOString(),
        endDate: dayjs(v.endDate).toISOString(),
        createdBy: user,
      }
      const campaignCollectionRef =
        firestoreService.getCollectionRef(campaignsCollection)
      await campaignCollectionRef.add(data)
      resetForm()
      showSuccessSnackbar('Campaign added')
      setLoading(false)
      navigation.goBack()
    } catch (error) {
      setLoading(false)
      const message = getErrorMessage(error)
      showErrorSnackbar(message)
    }
  }

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      title: '',
      startDate: '',
      image: '',
      location: '',
      endDate: '',
    },
    onSubmit,
    validationSchema: schema,
  })
  return (
    <AuthLayout
      animation={require('@src/assets/animations/campaign.json')}
      title='Create a Campaign'
      busy={loading}
      mainButtonTitle='Create Campaign'
      mainButtonPressed={handleSubmit}
      onBackButtonPressed={() => navigation.goBack()}>
      <TextInput
        box
        icon='bookmark'
        placeholder='Title'
        value={values.title}
        error={errors.title}
        touched={touched.title}
        onChangeText={handleChange('title')}
        onBlur={handleBlur('title')}
      />
      <TextInput
        box
        icon='map-pin'
        placeholder='Location'
        value={values.location}
        error={errors.location}
        touched={touched.location}
        onChangeText={handleChange('location')}
        onBlur={handleBlur('location')}
      />
      <TextInput
        box
        icon='image'
        placeholder='Image'
        value={values.image}
        error={errors.image}
        touched={touched.image}
        onChangeText={handleChange('image')}
        onBlur={handleBlur('image')}
      />
      <TextInput
        box
        icon='calendar'
        placeholder='Start Date yyyy-mm-dd'
        value={values.startDate}
        error={errors.startDate}
        touched={touched.startDate}
        onChangeText={handleChange('startDate')}
        onBlur={handleBlur('startDate')}
      />
      <TextInput
        box
        icon='calendar'
        placeholder='End Date yyyy-mm-dd'
        value={values.endDate}
        error={errors.endDate}
        touched={touched.endDate}
        onChangeText={handleChange('endDate')}
        onBlur={handleBlur('endDate')}
      />
    </AuthLayout>
  )
}

export default CreateCampaign
