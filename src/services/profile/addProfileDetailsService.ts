import UserTable from '../../models/userTable';

const addProfileDetailsService = async (user_id, profileDetails) => {
  try {
    const findUser = await UserTable.findOne({
      where: { user_id: user_id },
      raw: true,
    });

    if (!findUser) {
      return { status: false, message: 'User Not Found', data: {} };
    }

    const updateDetails = await UserTable.update(
      {
        phone: profileDetails.phone,
        job_title: profileDetails.job_title,
        company_name: profileDetails.company_name,
      },
      { where: { user_id: user_id } },
    );

    if (updateDetails[0] != 1) {
      return { status: false, message: 'Failed To Update Details', data: {} };
    }

    return {
      status: true,
      message: 'Details Updated Successfully!',
      data: {},
    };
  } catch (error) {
    return { status: false, message: 'Error Occured', data: { error } };
  }
};

export default addProfileDetailsService;
