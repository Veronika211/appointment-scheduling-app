export const getExamFields = () => {
  return {
    url: '/examFields',
    method: 'get',
  };
};

export const getExamTypes = () => {
  return {
    url: '/examFields',
    method: 'get',
  };
};

export const addAppointment = (data: any) => {
  return {
    url: '/appointments',
    method: 'get',
    body: data,
  };
};
