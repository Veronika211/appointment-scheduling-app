export const getExamFields = () => {
  return {
    url: '/examFields.json',
    method: 'get',
  };
};

export const getExamTypes = () => {
  return {
    url: '/examTypes.json',
    method: 'get',
  };
};

export const addAppointment = () => {
  return {
    url: '/appointments.json',
    method: 'post',
  };
};
