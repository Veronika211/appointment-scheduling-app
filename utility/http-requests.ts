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

export const addAppointment = (data: any) => {
  return {
    url: '/appointments',
    method: 'post',
    body: data,
  };
};
